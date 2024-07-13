import React, { useState, useEffect } from "react";
import OneLineChart from "../charts/one-line-chart";
import {
    NBCFStatus,
    trainNBCF,
    CancelNBCF,
} from "../../../services/AdminApi/adminApi";

const AlgorithmNeighBase = () => {
    const [logs, setLogs] = useState([]);

    const [isTraining, setIsTraining] = useState(false);
    const [progress, setProgress] = useState(0);
    const [phase, setPhase] = useState("");
    const [seconds, setSeconds] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [hours, setHours] = useState(0);
    const [timer, setTime] = useState("00h:00m:00s");
    const [btnstart, setBtnStart] = useState(true);
    const [btncancel, setBtnCancel] = useState(false);

    // Sử dụng useEffect để cập nhật tiến độ huấn luyện
    useEffect(() => {
        let intervalId;

        if (isTraining) {
            intervalId = setInterval(async () => {
                const newProgress = await handle_status();
                if (newProgress.end == 1) {
                    setIsTraining(false);
                    clearInterval(intervalId);
                    setBtnStart(true);
                    setBtnCancel(false);
                    setPhase("");
                    setIsTraining(false);
                } else {
                    if (newProgress.phase == 1) {
                        setPhase("Chuẩn bị dữ liệu");
                    } else if (newProgress.phase == 2) {
                        setPhase("tiến hành huấn luyện");
                    } else if (newProgress.phase == 3) {
                        setBtnCancel(false);
                        setPhase("cập nhật mô hình. Không thể dừng.");
                    } else if (newProgress.phase == 4) {
                        setPhase("Kết thúc");
                    } else {
                        setPhase("Xảy ra lỗi. Hủy bỏ huấn luyên.");
                    }
                    setProgress(newProgress.status);
                    setSeconds((prevSeconds) => prevSeconds + 1);
                }
            }, 1000); // Gọi API mỗi 1 giây
        }

        // Dọn dẹp khi hủy huấn luyện
        return () => {
            if (intervalId) {
                clearInterval(intervalId);
            }
        };
    }, [isTraining]);

    const handle_cancel = async () => {
        const cancel_request = await CancelNBCF();
    };

    const handle_start = async () => {
        const start_request = await trainNBCF();
        setSeconds(0);
        setHours(0);
        setMinutes(0);
        setIsTraining(true);
        setPhase("");
        setBtnStart(false);
        setProgress(0);
        setBtnCancel(true);
    };

    const handle_status = async () => {
        const status_request = await NBCFStatus();
        return status_request.data;
    };

    useEffect(() => {
        if (seconds === 60) {
            setSeconds(0);
            setMinutes((prevMinutes) => prevMinutes + 1);
        }
        setTime(`${hours}h:${minutes}m:${seconds}s`);
    }, [seconds]);

    useEffect(() => {
        if (minutes === 60) {
            setMinutes(0);
            setHours((prevHours) => prevHours + 1);
        }
    }, [minutes]);

    return (
        <div class="p-4 sm:ml-64 h-min">
            <div class="p-4 border-2 h-full border-dashed rounded-lg dark:border-gray-700 mt-20">
                <div class="flex h-1/2  items-center justify-center w-full mb-4 rounded  dark:bg-gray-800">
                    <OneLineChart time={timer} percent={progress} className={`h-full`} />
                </div>
                <div class="grid grid-cols-3 gap-4 mb-4">
                    <div class="flex relative col-span-2 items-center justify-center rounded h-72 overflow-y-auto bg-gray-100  dark:bg-gray-800">
                        <div className="absolute top-0 right-0 lg:p-4 font-semibold text-lg h-12 z-50">
                            Tiến trình thực thi
                        </div>
                        <div className=" w-full p-4 overflow-auto text-sm text-gray-600 ">
                            <p className="mb-1">{phase}</p>
                        </div>
                    </div>

                    <div class="flex justify-stretch items-center lg:gap-4  rounded  h-28 dark:bg-gray-800">
                        {btnstart && (
                            <button
                                className="w-full text-white rounded-md cursor-pointer bg-primary lg:px-4 lg:py-2"
                                onClick={handle_start}
                            >
                                Cập nhật
                            </button>
                        )}
                        {btncancel && (
                            <button
                                className="w-full text-white bg-red-600 rounded-md lg:px-4 lg:py-2"
                                onClick={handle_cancel}
                            >
                                Huỷ
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
export default AlgorithmNeighBase;
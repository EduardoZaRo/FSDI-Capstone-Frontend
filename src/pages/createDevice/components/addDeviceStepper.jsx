import './addDeviceStepper.css'
import { useEffect, useState } from "react";

function AddDeviceStepper(props) {
    const activeColor = " bg-blue-200 ";
    const nonactiveColor = " bg-gray-100 ";
    const activeAnimation = " animate-pulse ";
    useEffect(()=>{
        console.log("AddDeviceStepper", props.currentStep)
    }, [props.currentStep])
    return (
    <div className="stepper-component flex-column">
        <ol className="flex items-center w-4/6 justify-center m-auto content-center">
            <li className="flex w-full items-center text-blue-600 dark:text-blue-500 after:content-[''] after:w-full after:h-1 after:border-b after:border-blue-100 after:border-4 after:inline-block dark:after:border-blue-800">
                <span className={"flex items-center justify-center w-12 h-12 rounded-full lg:h-12 lg:w-12 dark:bg-blue-800 shrink-0 " + (props.currentStep >= 0 ? activeColor : nonactiveColor) + (props.currentStep == 0 ? activeAnimation : "") }>
                <i className="bi bi-cpu"></i>
                </span>
            </li>
            <li className={"flex w-full items-center after:content-[''] after:w-full after:h-1  " + (props.currentStep >= 1 ? " after:h-1 after:border-b after:border-blue-100 after:border-4 after:inline-block dark:after:border-blue-800 " : " after:border-b after:border-gray-100 after:border-4 after:inline-block dark:after:border-gray-700 ")}>
                <span className={"flex items-center justify-center w-12 h-12 rounded-full lg:h-12 lg:w-12 dark:bg-blue-800 shrink-0 " + (props.currentStep >= 1 ? activeColor : nonactiveColor) + (props.currentStep == 1 ? activeAnimation : "")}>
                <i className="bi bi-list-check"></i>
                </span>
            </li>
            <li className={"flex w-full items-center after:content-[''] after:w-full after:h-1  " + (props.currentStep >= 2 ? " after:h-1 after:border-b after:border-blue-100 after:border-4 after:inline-block dark:after:border-blue-800 " : " after:border-b after:border-gray-100 after:border-4 after:inline-block dark:after:border-gray-700 ")}>
                <span className={"flex items-center justify-center w-12 h-12 rounded-full lg:h-12 lg:w-12 dark:bg-blue-800 shrink-0 " + (props.currentStep >= 2 ? activeColor : nonactiveColor) + (props.currentStep == 2 ? activeAnimation : "") }>
                <i className="bi bi-code-slash"></i>
                </span>
            </li>
            <li className="flex items-center w-fit">
                <span className={"flex items-center justify-center w-12 h-12 rounded-full lg:h-12 lg:w-12 dark:bg-blue-800 shrink-0 " + (props.currentStep >= 3 ? activeColor : nonactiveColor) + (props.currentStep == 3 ? activeAnimation : "") }>
                <i className="bi bi-patch-check"></i>
                </span>
            </li>
        </ol>
    </div>
    );
}

export default AddDeviceStepper;
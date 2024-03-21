"use client";

import useLokaliseTranslation from "@/hooks/use-lokalise-translation";
import Loader from "./ui/loader";

const PushPreview = () => {
    // const { key, translation, isLoading, error } = useLokaliseTranslation();
    
    return (
        <div>
            <div className="flex flex-col justify-center items-center bg-no-repeat bg-cover rounded-3xl w-[310px] h-[600px] overflow-hidden" style={{backgroundImage: "url(https://cdn.braze.com/dashboard-frontend-assets/static/486edc31ffe844f7d798.png)"}}>
                <div className="max-w-[290px] rounded-3xl absolute bottom-[176px] bg-white" style={{maxHeight: "calc(100% - 660px"}}>
                    <div className="flex flex-row justify-between gap-4 p-4">
                        <div className="rounded overflow-hidden max-w-8 h-full">
                            <img src="https://s3.amazonaws.com/appboy-dashboard-uploads/ios_apps/images/60a3e3984941b550b2ec050a/8d659a268e9489d3394a19064bf4a26efd38111b/small.png?1633452436" className="w-full h-auto object-cover" />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-xs">Notification Title</span>
                            <span className="text-xs">Here's notification text.</span>
                        </div>
                        <div className="">
                            <span className="text-xs">now</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PushPreview;

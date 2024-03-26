const ProjectInfoCard = () => {
    return (
        <div className="mt-8">
            <h2 className="text-xl font-semibold text-center mb-2">Item title</h2>
            <div className="flex flex-col divide-y-[1px]">
                <div className="flex flex-row justify-between items-center">
                    <span>Channel</span>
                    <span>PN</span>
                </div>
                <div className="flex flex-row justify-between items-center">
                    <span>Language</span>
                    <span>HU</span>
                </div>
                <div className="flex flex-col justify-between items-start">
                    <span>Template:</span>
                    <span>pn-template.html</span>
                </div>
            </div>
        </div>
    );
};

export default ProjectInfoCard;

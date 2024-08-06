import React from "react";
import classnames from "classnames";
import type { FontMetadata } from "server/utils/FontManager/Font";
import { type FontUsage } from "../../api/scanIcon";
import { FontStyle } from "./FontStyle";
import { FontCard } from "../FontCard";
import { message } from "antd";

export interface FontIconGridProps {
    metadata: FontMetadata[];
    usage?: FontUsage["font"];
    onRename?: (oldName: string, newName: string) => void;
    onRemove?: (name: string) => void;
}

const FontIconGrid: React.FC<FontIconGridProps> = React.memo(({ metadata, usage, onRemove, onRename }) => {
    const unusedIconName = React.useMemo(() => new Set(usage?.unused), [usage]);
    const usedIconName = React.useMemo(() => new Set(usage?.used), [usage]);

    return (
        <>
            <FontStyle metadata={metadata} />
            <div className=" grid grid-cols-6 gap-3">
                {metadata.map(item => {
                    return (
                        <FontCard
                            key={item.fileName}
                            className={classnames(unusedIconName.has(item.fileName) && "bg-slate-200", usedIconName.has(item.fileName) && "bg-green-200")}
                            name={item.fileName}
                            icon={
                                <span
                                    className={`iconfont cursor-copy text-[52px] leading-none ${item.fileName}`}
                                    onClick={() => {
                                        navigator.clipboard.writeText(item.fileName).then(() => {
                                            message.success("已复制到剪贴板");
                                        });
                                    }}
                                />
                            }
                            onClickRemove={() => onRemove?.(item.fileName)}
                            onEditConfirm={value => onRename?.(item.fileName, value)}
                        />
                    );
                })}
            </div>
        </>
    );
});

export default FontIconGrid;

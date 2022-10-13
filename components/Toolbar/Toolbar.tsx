export default function Toolbar({selectTool}: {selectTool: (toolType: string) => void}) {
    return (
        <div>
            <button onClick={() => selectTool("wall")}>Wall</button>
            <button onClick={() => selectTool("start")}>Start</button>
            <button onClick={() => selectTool("end")}>End</button>
        </div>
    );
}

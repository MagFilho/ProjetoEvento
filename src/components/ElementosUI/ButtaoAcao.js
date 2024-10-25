export default function ButtaoAcao({onClick, icon,texto, style}){
    return (
        <>
            <abbr title={texto}>
                <i onClick={onClick} style={{padding: "0.9vh", cursor: "pointer", ...style}}
                   className={icon}
                />
            </abbr>
        </>
    )
}
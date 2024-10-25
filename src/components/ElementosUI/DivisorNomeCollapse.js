export default function DivisorNomeCollapse({isOpen, nome, toggle, noIcon}){
    return (
        <>
            <div style={{display: "flex", alignItems: "center", cursor: "pointer"}} onClick={toggle}>
                <hr style={{flex: "1", marginRight: ".5em"}}/>
                        <h6>{nome}</h6>     
                <hr style={{flex: "1", marginLeft: ".5em"}}/> 
                {!noIcon &&
                    <i style={{paddingLeft: ".5em"}} className={
                            isOpen
                                ? "bi fs-8 bi-chevron-up"
                                : "bi fs-8 bi-chevron-down"
                        }
                    />
                }
                
                </div>
        </>
    )
}
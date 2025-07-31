export function Languages(props){
    const LangData = props.languageData.map(data=>{
        
        const styles = {
            backgroundColor:data.lang.backgroundColor,
            color:data.lang.color
        }

        return(
            <span key={data.key} className={data.className} style={styles}>{data.lang.name}</span>
            
        )

    })

    return(
        <article className="languages"> 
            {LangData}
        </article>
        
    )

}
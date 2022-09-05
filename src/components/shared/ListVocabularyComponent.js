export function ListVocabulary({ arrayElements, showConter = true }) {
    return (
        <ul className="list-group my-3">
            {arrayElements.map((item, i) => {
                const [espanol, english] = item.data;
                return (
                    <li key={i} className="list-group-item">
                        <b>{english}</b>: {espanol}
                        {showConter ? <span className="badge">{item.counter} attempt/s</span> : <></>}
                    </li>
                )
            })}
        </ul>
    )
}
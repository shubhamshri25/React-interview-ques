import React, { useState } from "react";
import data from "./data";
import "./style.css";

export default function Accordian() {
  const [selected, setSelected] = useState(null);
  const [enableMutliSelect, setEnableMutliSelect] = useState(false);
  const [multiple, setMultiple] = useState([]);

  function handelSingleSelection(currentId) {
    console.log(currentId);
    setSelected(currentId === selected ? null : currentId);
  }

   // for multiple selection of accordian
  function handelMultipleSelection(currentId) {
    let copyMultilple = [...multiple];
    const findCurrentIndex = copyMultilple.indexOf(currentId);
    
    console.log(findCurrentIndex);

    if (findCurrentIndex === -1) copyMultilple.push(currentId);
    else copyMultilple.splice(findCurrentIndex, 1);
    setMultiple(copyMultilple);
  }
  console.log(selected, multiple);

  return (
    <div className="wrapper">
      <button onClick={() => setEnableMutliSelect(!enableMutliSelect)}>
        EnableMultiSelection
      </button>
      <div className="accordian">
        {data && data.length > 0 ? (
          data.map((item) => (
            <div key={item.id} className="item">
              <div
                className="title"
                onClick={
                  enableMutliSelect
                    ? () => handelMultipleSelection(item.id)
                    : () => handelSingleSelection(item.id)
                }
              >
                <h3>{item.question}</h3>
                <span>+</span>
              </div>
              {enableMutliSelect
                ? multiple.indexOf(item.id) !== -1 && (
                    <div className="acc-content">{item.answer}</div>
                  )
                : selected === item.id && (
                    <div className="acc-content">{item.answer}</div>
                  )}

              {/* if selected is equal to item.id then show the content
              {selected === item.id && (
                <div className="content">
                  <p>{item.answer}</p>
                </div>
              )} */}
            </div>
          ))
        ) : (
          <div>No data present</div>
        )}
      </div>
    </div>
  );
}

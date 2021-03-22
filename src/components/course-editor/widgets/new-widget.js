import {FaPlus} from "react-icons/all";
import React, {useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import {useParams} from "react-router-dom";

const useStyles = makeStyles({
                                 newWidget: {
                                     display: 'inline',
                                 },
                             });
export const NewWidget = ({createWidgetForTopic}) => {
    const classes = useStyles();
    const [newWidget, setNewWidget] = useState({type: 'HEADING'});
    const {topicId} = useParams();

    const handleNewWidgetChange = (e) => {
        setNewWidget({...newWidget, text: e.target.value})
    }

    const handleSizeChange = (e) => {
        setNewWidget(
            {...newWidget, size: e.target.selectedIndex})
    }

    const handleTextAreaChange = (e) => {
        setNewWidget({...newWidget, text: e.target.value});
    }
    return (<>
            <h3>New Widget</h3>
            <select
                onChange={(e) =>
                    setNewWidget(
                        {...newWidget, type: e.target.options[e.target.selectedIndex].value}
                    )
                }
                value={newWidget.type}>
                {["PARAGRAPH", "HEADING"].map(type =>
                                                  <option key={type}
                                                          value={type}>{type[0] +
                                                                        type.substr(1,
                                                                                    type.length)
                                                                            .toLowerCase()}</option>
                )}
            </select>
            <br/>
            <label>Text:
                {newWidget.type === 'HEADING' &&
                 <>
                     <input className={classes.newWidget} value={newWidget.text}
                            onChange={handleNewWidgetChange}/>
                     <br/>
                     <select className={classes.root}
                             onChange={handleSizeChange}
                             value={`Heading ${newWidget.size}`}>
                         {[1, 2, 3, 4, 5, 6].map(size =>
                                                     <option key={size}
                                                             defaultValue={size}>Heading {size}</option>
                         )}
                     </select>
                 </>
                }
                {newWidget.type === 'PARAGRAPH' &&
                 <textarea className={classes.newWidget} defaultValue={newWidget.text}
                           onChange={handleTextAreaChange}/>
                }
            </label>
            <FaPlus onClick={() => {
                createWidgetForTopic(topicId, newWidget)
                setNewWidget({text: '', size: 1, type: 'HEADING'});
            }}/>
        </>
    );
}

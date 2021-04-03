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

    const handleWidgetValueChange = (e, value) => {
        newWidget[value] = e.target.value;
        setNewWidget({...newWidget})
    }

    const handleOrderedChange = () => {
        setNewWidget(
            {...newWidget, ordered: !newWidget.ordered});
    }

    const handleSizeChange = (e) => {
        setNewWidget(
            {...newWidget, size: e.target.selectedIndex})
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
                {["PARAGRAPH", "HEADING", "IMAGE", "LIST"].map(type =>
                                                           <option key={type}
                                                                   value={type}>{type[0] +
                                                                                 type.substr(1,
                                                                                             type.length)
                                                                                     .toLowerCase()}</option>
                )}
            </select>
            <br/>
            <label>
                {newWidget.type === 'HEADING' &&
                 <>Text:
                     <input className={classes.newWidget} value={newWidget.text}
                            onChange={e => handleWidgetValueChange(e,'text')}/>
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
                 <>Content:
                     <textarea className={classes.newWidget} defaultValue={newWidget.text}
                               onChange={e => handleWidgetValueChange(e,'text')}/>
                 </>
                }
                {newWidget.type === 'LIST' &&
                 <>
                     <input
                         type="checkbox"
                         id="isOrdered"
                         name="isOrdered"
                         value={newWidget.ordered}
                         onChange={handleOrderedChange}/>
                     <label htmlFor="isOrdered"> Ordered </label><br/>

                     <textarea className={classes.newWidget} defaultValue={newWidget.text}
                               onChange={e => handleWidgetValueChange(e,'text')}/>
                 </>
                }
                {newWidget.type === 'IMAGE' &&
                 <>Image Src:
                     <input className={classes.newWidget} defaultValue={newWidget.text}
                            onChange={e => handleWidgetValueChange(e,'src')}/>
                 </>
                }
            </label>
            <FaPlus onClick={() => {
                createWidgetForTopic(topicId, newWidget)
                setNewWidget({text: '', size: 1, type: 'HEADING'});
            }}/>
        </>
    );
}

import React from 'react'
import {makeStyles} from "@material-ui/core/styles";

const ListWidget = ({widget, editing, changeEditingWidget}) =>
    <>
        {
            editing &&
            <>
                <input
                    type="checkbox"
                    id="isOrdered"
                    name="isOrdered"
                    checked={widget.ordered}
                    onChange={() => changeEditingWidget(
                        {...widget, ordered: !widget.ordered})}/>
                <label htmlFor="isOrdered"> Ordered </label><br/>
                <textarea
                    onChange={(e) =>
                        changeEditingWidget({...widget, text: e.target.value})}
                    defaultValue={widget.text}/>
            </>
        }
        {
            !editing &&
            <>
                {!widget.ordered && <ul>
                    {widget.text.split('\n').map(item =>
                                                     <li>
                                                         {item}
                                                     </li>)}
                </ul>}
                {widget.ordered && <ol>
                    {widget.text.split('\n').map(item =>
                                                     <li>
                                                         {item}
                                                     </li>)}
                </ol>}
            </>
        }
    </>

export default ListWidget

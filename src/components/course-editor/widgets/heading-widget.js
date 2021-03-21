import React from 'react'
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles({
                                 root: {
                                     display: 'inline',
                                 },
                             });
const HeadingWidget = ({widget, editing, changeEditingWidget}) => {
    const classes = useStyles();
    return (
        <>
            {
                editing &&
                <>
                    <input className={classes.root} defaultValue={widget.text}
                           onChange={(e) =>
                               changeEditingWidget({...widget, text: e.target.value})}/>
                    <br/>
                    <select className={classes.root}
                            onChange={(e) => changeEditingWidget(
                                {...widget, size: e.target.value})}
                            value={`Heading ${widget.size}`}>
                        {[1, 2, 3, 4, 5, 6].map(size =>
                                                    <option key={size}
                                                            defaultValue={size}>Heading {size}</option>
                        )}
                    </select>
                </>
            }
            {
                !editing &&
                <>
                    {widget.size === 1 && <h1 className={classes.root}>{widget.text}</h1>}
                    {widget.size === 2 && <h2 className={classes.root}>{widget.text}</h2>}
                    {widget.size === 3 && <h3 className={classes.root}>{widget.text}</h3>}
                    {widget.size === 4 && <h4 className={classes.root}>{widget.text}</h4>}
                    {widget.size === 5 && <h5 className={classes.root}>{widget.text}</h5>}
                    {widget.size === 6 && <h6 className={classes.root}>{widget.text}</h6>}
                </>
            }
        </>
    )
};

export default HeadingWidget

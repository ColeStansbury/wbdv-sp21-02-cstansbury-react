import React from 'react'
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles({
                                 root: {
                                     display: 'inline',
                                 },
                             });
const ImageWidget = ({widget, editing, changeEditingWidget}) => {
    const classes = useStyles();

    const handleSelectChange = (e) => {
        changeEditingWidget(
            {...widget, size: parseInt(e.target.value)});
    }

    return (
        <>
            {
                editing &&
                <>
                    Image Url:
                    <input className={classes.root} defaultValue={widget.src}
                           onChange={(e) =>
                               changeEditingWidget({...widget, src: e.target.value})}/>
                    Image Width:
                    <input className={classes.root} defaultValue={widget.width}
                           onChange={(e) =>
                               changeEditingWidget({...widget, width: e.target.value})}/>
                    Image Height:
                    <input className={classes.root} defaultValue={widget.height}
                           onChange={(e) =>
                               changeEditingWidget({...widget, height: e.target.value})}/>
                </>
            }
            {
                !editing &&
                <>
                    <img width={widget.width ? widget.width : 'auto'}
                         height={widget.height ? widget.height : 'auto'} src={widget.src} placeholder={widget.src}
                         alt={'widget image'}/>
                </>
            }
        </>
    )
};

export default ImageWidget

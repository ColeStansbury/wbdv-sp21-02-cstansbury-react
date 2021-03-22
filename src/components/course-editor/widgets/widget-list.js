import React, {useState, useEffect} from 'react'
import HeadingWidget from "./heading-widget";
import ParagraphWidget from "./paragraph-widget";
import {useParams} from "react-router-dom";
import * as widgetService from "../../../services/widget-service";
import {FaCheck, FaCog, FaTrash} from "react-icons/fa";
import {connect} from "react-redux";
import {NewWidget} from "./new-widget";

const WidgetList = ({
                        findWidgetsForTopic,
                        createWidgetForTopic,
                        updateWidget,
                        deleteWidget,
                        widgets,
                    }) => {
    const {topicId} = useParams();
    const [editingWidget, setEditingWidget] = useState({});

    useEffect(() => {
        if (topicId !== "undefined" && typeof topicId !== "undefined") {
            findWidgetsForTopic(topicId)
        }
    }, [findWidgetsForTopic, topicId]);

    return (
        <>
            {topicId &&
             <>
                 <br/>
                 <br/>
                 <NewWidget createWidgetForTopic={createWidgetForTopic}/>
                 {widgets.length !== 0 && <h2>Widget List</h2>}
                 <div>
                     {
                         widgets.map(widget =>
                                         <div key={widget.id}>
                                             {
                                                 editingWidget.id === widget.id &&
                                                 <>
                                                     <FaCheck onClick={() => {
                                                         updateWidget(widget.id, editingWidget)
                                                         setEditingWidget({});
                                                     }}/>
                                                     <FaTrash onClick={() => deleteWidget(
                                                         widget.id)}/>
                                                 </>
                                             }
                                             {
                                                 editingWidget.id !== widget.id &&
                                                 <FaCog onClick={() => setEditingWidget(widget)}/>
                                             }
                                             {
                                                 editingWidget.id === widget.id && <>
                                                     <select
                                                         onChange={(e) =>
                                                             setEditingWidget(
                                                                 {
                                                                     ...widget,
                                                                     type: e.target.options[e.target.selectedIndex].value
                                                                 }
                                                             )
                                                         }
                                                         defaultValue={widget.type}>
                                                         {["PARAGRAPH", "HEADING"]
                                                             .map(type =>
                                                                      <option
                                                                          key={type}
                                                                          value={type}>{type[0]
                                                                                        + type.substr(
                                                                          1,
                                                                          type.length)
                                                                                            .toLowerCase()}
                                                                      </option>
                                                             )}
                                                     </select>
                                                     <br/>
                                                 </>
                                             }
                                             {(widget.type === "HEADING" &&
                                               !(editingWidget.id === widget.id
                                                 && editingWidget.type === 'PARAGRAPH') ||
                                               (editingWidget.type === 'HEADING' && widget.id
                                                === editingWidget.id)) &&
                                              <HeadingWidget
                                                  changeEditingWidget={setEditingWidget}
                                                  editing={editingWidget.id === widget.id}
                                                  widget={widget.id === editingWidget.id
                                                          ? editingWidget : widget}/>
                                             }
                                             {
                                                 (widget.type === "PARAGRAPH" &&
                                                  !(editingWidget.id === widget.id
                                                    && editingWidget.type === 'HEADING') ||
                                                  (editingWidget.type === 'PARAGRAPH' && widget.id
                                                   === editingWidget.id)) &&
                                                 <ParagraphWidget
                                                     changeEditingWidget={setEditingWidget}
                                                     editing={editingWidget.id === widget.id}
                                                     widget={widget.id === editingWidget.id
                                                             ? editingWidget : widget}/>
                                             }
                                         </div>
                         )
                     }
                 </div>
             </>
            }
        </>
    );
};
const stpm = (state) => (
    {
        widgets: state.widgetReducer.widgets
    }
)
const dtpm = (dispatch) => (
    {
        findWidgetsForTopic: (topicId) => {
            widgetService.findWidgetsForTopic(topicId)
                .then(widgets => dispatch({
                                              type: "FIND_WIDGETS",
                                              payload: widgets
                                          }));
        },
        createWidgetForTopic: (topicId, widget) => {
            widget.size = widget.size ? widget.size : 1;
            widgetService
                .createWidgetForTopic(topicId, widget)
                .then(widget => dispatch({
                                             type: "CREATE_WIDGET",
                                             payload: widget
                                         }));

        },
        updateWidget:
            (id, widget) => {
                widgetService.updateWidget(id, widget)
                    .then(() => dispatch({
                                             type: "UPDATE_WIDGET",
                                             payload: widget,
                                         }));
            },
        deleteWidget:
            (widgetId) => {
                widgetService
                    .deleteWidget(widgetId)
                    .then(() => dispatch({
                                             type: "DELETE_WIDGET",
                                             payload: widgetId,
                                         }));

            },
    }
);

export default connect(stpm, dtpm)(WidgetList);

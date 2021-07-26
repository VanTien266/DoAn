import React, { Component } from "react";
import { TouchableOpacity, View } from "react-native";
import { Input } from "react-native-elements";

import DateTimePicker from "@react-native-community/datetimepicker";
import XDate from "xdate";

class TimeSetting extends Component {
  state = {
    ToStartTimeValue: null,
    ToEndTimeValue: null,
    isToTimePickerVisible: false,
    dateOrTimeValue: null,
    timePickerVisible: false,
  };
  saveStartingTime = (value) => {
    console.log("saveStartTime - value:", value);
    this.setState({
      ToStartTimeValue: value,
    });
  };

  saveEndingTime = (value) => {
    console.log("saveEndingTime - value:", value);
    this.setState({
      ToEndTimeValue: value,
    });
  };

  fRenderDateTimePicker = (
    dateTimePickerVisible,
    visibilityVariableName,
    defaultValue,
    saveValueFunctionName
  ) => {
    return (
      <View>
        {Platform.OS === "android" &&
          dateTimePickerVisible &&
          this.state.timePickerVisible && (
            <DateTimePicker
              mode={"time"}
              display="spinner" // 'default', 'spinner', 'calendar', 'clock' // Android Only
              is24Hour={false} // Android Only
              value={defaultValue}
              onChange={(event, value) => {
                let newDateTime = value;
                this.setState({
                  dateOrTimeValue: newDateTime,
                  timePickerVisible: false,
                  [visibilityVariableName]:
                    Platform.OS === "ios" ? true : false,
                });
                if (event.type === "set") {
                  saveValueFunctionName(newDateTime);
                }
              }}
            />
          )}
      </View>
    );
  };

  fFormatDateTime = (date1) => {
    if (date1 === null) {
      return null;
    }
    let dateFormatted;
    const date2 = new XDate(date1);

    dateFormatted = date2.toString("hh:mm TT");
    return dateFormatted;
  };

  // This function shows/hides the initial DateTimePicker
  // If the mode is "datetime", another picker will be displayed by the DATE picker
  fRenderDatePicker = (visibilityVariableName) => {
    return this.setState({
      [visibilityVariableName]: true,
      timePickerVisible: true,
    });
  };

  render() {
    let defaultShiftStartDateTime = new Date();
    defaultShiftStartDateTime.setDate(defaultShiftStartDateTime.getDate() + 1);
    defaultShiftStartDateTime.setHours(9);
    defaultShiftStartDateTime.setMinutes(0);
    defaultShiftStartDateTime.setSeconds(0);

    let defaultShiftEndDateTime = new Date();
    defaultShiftEndDateTime.setDate(defaultShiftEndDateTime.getDate() + 1);
    defaultShiftEndDateTime.setHours(17);
    defaultShiftEndDateTime.setMinutes(0);
    defaultShiftEndDateTime.setSeconds(0);

    return (
      <View>
        <TouchableOpacity
          onPress={() => {
            this.fRenderDatePicker("isToTimePickerVisible");
          }}
        >
          <Input
            label="Start time"
            placeholder={"00:00 AM"}
            editable={false}
            value={this.fFormatDateTime(this.state.ToStartTimeValue, "time")}
          />
        </TouchableOpacity>
        {this.fRenderDateTimePicker(
          this.state.isToTimePickerVisible,
          "isToTimePickerVisible",
          defaultShiftEndDateTime,
          this.saveStartingTime
        )}
        <TouchableOpacity
          onPress={() => {
            this.fRenderDatePicker("isToTimePickerVisible");
          }}
        >
          <Input
            label="End Time"
            placeholder={"12:00 PM"}
            editable={false}
            value={this.fFormatDateTime(this.state.ToEndTimeValue, "time")}
          />
        </TouchableOpacity>
        {this.fRenderDateTimePicker(
          this.state.isToTimePickerVisible,
          "isToTimePickerVisible",
          defaultShiftEndDateTime,
          this.saveEndingTime
        )}
      </View>
    );
  }
}

export default TimeSetting;

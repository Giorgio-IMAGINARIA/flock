// @flow
// React
import React from 'react';
// Radium
import Radium from 'radium';
let Style = Radium.Style;
//Action Creators
import ActionCreatorSendToGithub from '../actions/ActionCreatorSendToGithub';
//Material UI
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import RightArrow from 'material-ui/svg-icons/navigation/chevron-right';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import Checkbox from 'material-ui/Checkbox';
import RaisedButton from 'material-ui/RaisedButton';
import Chip from 'material-ui/Chip';
import DatePicker from 'material-ui/DatePicker';
import TimePicker from 'material-ui/TimePicker';

interface GithubObject {
  milestone: any,
  state: string,
  assignee: string,
  creator?: string,
  mentioned?: string,
  labels?: string,
  sort: string,
  since?: string
}

class QueryPanel extends React.Component {

  constructor(props) {
    super(props);
    this.handleChangeStateInputSelect = this.handleChangeStateInputSelect.bind(this);
    this.handleChangeSortInputSelect = this.handleChangeSortInputSelect.bind(this);
    this.handleChangeDirectionInputSelect = this.handleChangeDirectionInputSelect.bind(this);
    this.handleChangeMilestoneText = this.handleChangeMilestoneText.bind(this);
    this.handleChangeAssigneeText = this.handleChangeAssigneeText.bind(this);
    this.handleChangeCreatorText = this.handleChangeCreatorText.bind(this);
    this.handleChangeMentionedText = this.handleChangeMentionedText.bind(this);
    this.handleChangeSecondsText = this.handleChangeSecondsText.bind(this);
    this.handleChangeLabelText = this.handleChangeLabelText.bind(this);
    this.addLabel = this.addLabel.bind(this);
    this.handleMilestoneChange = this.handleMilestoneChange.bind(this);
    this.handleAssigneeChange = this.handleAssigneeChange.bind(this);
    this.updateCreatorFilterChecked = this.updateCreatorFilterChecked.bind(this);
    this.updateMentionedFilterChecked = this.updateMentionedFilterChecked.bind(this);
    this.updateSecondsFilterChecked = this.updateSecondsFilterChecked.bind(this);
    this.handleRequestDeleteChip = this.handleRequestDeleteChip.bind(this);
    this.validateDetails = this.validateDetails.bind(this);
    this.handleDatePickerChange = this.handleDatePickerChange.bind(this);
    this.handleTimePickerChange = this.handleTimePickerChange.bind(this);

    this.state = {
      milestoneInputDisabled: true,
      milestoneIntegerValue: '',

      stateInputValue: 3,

      assigneeInputDisabled: true,
      assigneeTextValue: '',

      creatorFilterChecked: false,
      creatorInputDisabled: true,
      creatorTextValue: '',

      mentionedFilterChecked: false,
      mentionedInputDisabled: true,
      mentionedTextValue: '',

      chipData: [],
      labelTextValue: '',
      labelButtonDisabled: true,

      sortInputValue: 1,
      directionInputValue: 2,

      secondsFilterChecked: false,

      secondsInputDisabled: true,
      secondsValue: '',

      dateInputDisabled: true,
      dateValue: '',

      timeInputDisabled: true,
      timeValue: ''
    };
    this.paperStyle = {
      textAlign: 'center',
      display: 'inline-block',
      width: 'calc(100% - 100px)',
      margin: '50px',
      backgroundColor: '#7986CB'
    };
    this.headerStyle = {
      width: '100%',
      height: '50px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      justifyContent: 'space-around'

    };
    this.globaltext = {
      color: '#ffffff'
    }
    this.titles = {
      ...this.globaltext,
      margin: '0',
      textIndent: '25px'
    };
    this.mainTitle = {
      ...this.titles,
      fontSize: '12pt'
    };
    this.subTitle = {
      ...this.titles,
      fontSize: '9pt',
      fontWeight: '100'
    };
    this.internalTitleStyle = {
      ...this.titles,
      fontSize: '10pt',
      fontWeight: '200'
    };

    this.paperContentWrapStyle = {
      display: 'flex',
      flexDirection: 'column',
      padding: '50px 25px 25px'
    };

    this.inputBoxStyle = {
      border: '1px solid #ffffff',
      marginBottom: '25px'
    };

    this.inputBoxTitleRowStyle = {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-start',
      height: '20px',
      borderBottom: '1px solid #ffffff'
    };

    this.inputInternalRowStyle = {
      padding: '25px'
    };

    this.doubleRowStyle = {
      ...this.inputInternalRowStyle,
      display: 'flex'
    };

    this.doubleRowInternalWrapStyle = {
      display: 'flex',
      alignItems: 'space-between',
      width: '50%'
    };
    this.doubleRowInternalLeftWrapStyle = {
      ...this.doubleRowInternalWrapStyle,
      justifyContent: 'space-between'
    };
    this.doubleRowInternalRightWrapStyle = {
      ...this.doubleRowInternalWrapStyle,
      justifyContent: 'center'
    };

    this.doubleRowInternalRightTimeWrapStyle = {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-end',
      justifyContent: 'space-around',
      width: '50%'
    }

    this.doubleRowChipWrapStyle = {
      width: '50%',
      display: 'flex',
      alignItems: 'center',
      overflowX: 'auto',
      border: '1px dashed #ffffff'
    }

    this.radioButtonSpacedStyle = {
      marginBottom: '16px'
    };

    this.radioLabelStyle = {
      color: '#ffffff'
    }

    this.radioIconStyle = {
      fill: '#ffffff'
    }

    this.textInputStyle = {
      color: '#ffffff'
    }

    this.checkBoxWrapStyle = {
      display: 'flex',
      alignItems: 'center'
    };

    this.checkBoxStyle = {
      display: 'flex'
    }
    this.checkBoxIconStyle = {
      fill: '#ffffff'
    }
    this.checkBoxLabelStyle = {
      color: '#ffffff'
    }

    this.panelRowStyle = {
      width: '100%',
      display: 'flex',
      alignItems: 'center'
    };

    this.submitRowStyle = {
      ...this.panelRowStyle,
      height: '50px',
      justifyContent: 'center'
    };
    this.selectLoginElement = {
      textAlign: 'left'
    };

    this.floatingLabelStyle = {
      color: '#ffffff'
    };
    this.underlineFocusStyle = {
      borderColor: '#FC4482'
    };

    this.selectIconStyle = {
      fill: '#ffffff'
    };

    this.selectLabelStyle = {
      color: '#ffffff'
    };

    this.innerDoubleRowStyle = {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-around',
      width: '50%'
    };

    this.chipStyle = {
      margin: '4px'
    };

    this.timeTextFieldStyle = {
      color: '#ffffff'
    }

    this.milestoneIsNumber = false;
    this.milestoneStringValue = '*';
    this.stateInput = 'all';
    this.sortInput = 'created';
    this.directionInput = 'desc';
    this.assigneeStringValue = '*'
  }

  addLabel() {
    let chipDataArray: Array<any> = this.state.chipData;
    let nextKey: number = chipDataArray.length;
    chipDataArray.push({key: nextKey, label: this.state.labelTextValue});
    this.setState({chipData: chipDataArray, labelTextValue: '', labelButtonDisabled: true});
  }

  handleRequestDeleteChip(key) {
    this.chipData = this.state.chipData;
    const chipToDelete = this.chipData.map((chip) => chip.key).indexOf(key);
    this.chipData.splice(chipToDelete, 1);
    this.setState({chipData: this.chipData});
  }

  updateCreatorFilterChecked(evt : any, value : any) {
    this.setState({creatorFilterChecked: value});
    this.setState({
      creatorInputDisabled: !value
    });
    if (!value) {
      this.setState({creatorTextValue: ''});
    };
  }

  updateMentionedFilterChecked(evt : any, value : any) {
    this.setState({mentionedFilterChecked: value});
    this.setState({
      mentionedInputDisabled: !value
    });
    if (!value) {
      this.setState({mentionedTextValue: ''});
    };
  }

  handleMilestoneChange(evt : any, value : string): void {
    if (value === 'number') {
      this.setState({milestoneInputDisabled: false});
      this.milestoneStringValue = null;
    } else {
      this.setState({milestoneInputDisabled: true, milestoneIntegerValue: ''});

      switch (value) {
        case 'all':
          {
            this.milestoneStringValue = '*'
          }
          break;
        case 'none':
          {
            this.milestoneStringValue = value
          }
          break;
      };
    };
  }

  handleAssigneeChange(evt : any, value : string): void {
    if (value === 'text') {
      this.setState({assigneeInputDisabled: false});
      this.assigneeStringValue = null;
    } else {
      this.setState({assigneeInputDisabled: true, assigneeTextValue: ''});

      switch (value) {
        case 'all':
          {
            this.assigneeStringValue = '*'
          }
          break;
        case 'none':
          {
            this.assigneeStringValue = value
          }
          break;
      };
    };
  }

  handleChangeStateInputSelect(event, index, value) {
    this.setState({stateInputValue: value});
    switch (value) {
      case 1:
        {
          this.stateInput = 'open';
        }
        break;
      case 2:
        {
          this.stateInput = 'closed';
        }
        break;
      case 3:
        {
          this.stateInput = 'all';
        }
        break;
    };
  }

  handleChangeSortInputSelect(event, index, value) {
    this.setState({sortInputValue: value});
    switch (value) {
      case 1:
        {
          this.sortInput = 'created';
        }
        break;
      case 2:
        {
          this.sortInput = 'updated';
        }
        break;
      case 3:
        {
          this.sortInput = 'comments';
        }
        break;
    };
  }

  handleChangeDirectionInputSelect(event, index, value) {
    this.setState({directionInputValue: value});
    switch (value) {
      case 1:
        {
          this.directionInput = 'asc';
        }
        break;
      case 2:
        {
          this.directionInput = 'desc';
        }
        break;
    };
  }

  returnAbsIntValue(value : string): number {
    return Math.abs(parseInt(value));
  }

  handleChangeMilestoneText(evt, value) {
    this.returnAbsIntValue(value)
      ? this.setState({milestoneIntegerValue: this.returnAbsIntValue(value)})
      : this.setState({milestoneIntegerValue: ''});
  }

  handleChangeAssigneeText(evt, value) {
    this.setState({assigneeTextValue: value});
  }

  handleChangeCreatorText(evt, value) {
    this.setState({creatorTextValue: value});
  }

  handleChangeMentionedText(evt, value) {
    this.setState({mentionedTextValue: value});
  }

  handleChangeLabelText(evt, value) {
    value !== ''
      ? this.setState({labelButtonDisabled: false})
      : this.setState({labelButtonDisabled: true});
    this.setState({labelTextValue: value});
  }

  renderChip(data) {
    return (<div key={data.key}>
      <Chip onRequestDelete={() => this.handleRequestDeleteChip(data.key)} style={this.chipStyle}>
        {data.label}
      </Chip>
    </div>);
  }

  updateSecondsFilterChecked(evt : any, value : any) {
    this.setState({secondsFilterChecked: value});
    this.setState({
      dateInputDisabled: !value,
      timeInputDisabled: !value,
      secondsInputDisabled: !value
    });

    if (value) {
      let currentDate: any = new Date();
      this.setState({dateValue: currentDate, timeValue: currentDate, secondsValue: 0});
    };
  }

  handleDatePickerChange(evt : any, value : string) {
    this.setState({dateValue: value});
  }

  handleTimePickerChange(evt : any, value : string) {
    this.setState({timeValue: value});
  }

  handleChangeSecondsText(evt, value) {
    if (value === '') {
      this.setState({secondsValue: ''});
    } else if (value.length > 1 && value[0] === '0') {
      this.setState({secondsValue: 60});
    } else {
      (testValue < 60)
        ? this.setState({secondsValue: this.returnAbsIntValue(value)})
        : this.setState({secondsValue: 60});
    };
  }

  validateDetails() {
    let milestoneDisabled: boolean = this.state.milestoneInputDisabled;
    let milestoneValueToSend: any;
    if (milestoneDisabled) {
      milestoneValueToSend = this.milestoneStringValue;
    } else {
      this.state.milestoneIntegerValue
        ? milestoneValueToSend = this.state.milestoneIntegerValue
        : milestoneValueToSend = '*';
    };

    let assigneeDisabled: boolean = this.state.assigneeInputDisabled;
    let assigneeValueToSend: any;
    if (assigneeDisabled) {
      assigneeValueToSend = this.assigneeStringValue;
    } else {
      this.state.assigneeTextValue
        ? assigneeValueToSend = this.state.assigneeTextValue
        : assigneeValueToSend = '*';
    };

    let sortValueToSend: string = this.sortInput;
    let directionValueToSend: string = this.directionInput;

    let objectToSend: GithubObject = {
      milestone: milestoneValueToSend,
      state: this.stateInput,
      assignee: assigneeValueToSend,
      sort: sortValueToSend,
      direction: directionValueToSend
    }

    let creatorDisabled: boolean = this.state.creatorInputDisabled;
    if (!creatorDisabled && this.state.creatorTextValue) {
      objectToSend.creator = this.state.creatorTextValue;
    }

    let mentionedDisabled: boolean = this.state.mentionedInputDisabled;
    if (!mentionedDisabled && this.state.mentionedTextValue) {
      objectToSend.mentioned = this.state.mentionedTextValue;
    }

    let stringsArray: Array<string> = this.state.chipData;
    let labelsToSend: string = '';
    if (stringsArray.length > 0) {
      stringsArray.forEach((item, index, array) => {
        labelsToSend = labelsToSend + item.label;
        if (index !== array.length - 1) {
          labelsToSend = labelsToSend + ','
        };
      });
      objectToSend.labels = labelsToSend;
    };

    let timeInputDisabled: boolean = this.state.timeInputDisabled;
    let sinceValueToSend: string;

    if (!timeInputDisabled) {
      let dateValue: string = this.state.dateValue;
      let timeValue: string = this.state.timeValue;
      let secondsValue: number = this.state.secondsValue;
      sinceValueToSend = this.mergeTime(dateValue, timeValue, secondsValue);
      objectToSend.since = sinceValueToSend;
    };
    ActionCreatorSendToGithub(objectToSend);
  }

  mergeTime(dateValue : string, timeValue : string, secondsValue : number): string {
    let year: number = dateValue.getFullYear();
    let month: any = dateValue.getMonth();
    month++;
    if (month < 10) {
      month = `0${month}`;
    };
    let date: any = dateValue.getDate();
    if (date < 10) {
      date = `0${date}`;
    };
    let hour: any = timeValue.getHours()
    if (hour < 10) {
      hour = `0${hour}`;
    };
    let minute: any = timeValue.getMinutes();
    if (minute < 10) {
      minute = `0${minute}`;
    };
    let secondsValueToConvert: string;

    if (!secondsValue) {
      secondsValueToConvert = '00';
    } else {
      secondsValue < 10
        ? secondsValueToConvert = `0${secondsValue}`
        : secondsValueToConvert = `${secondsValue}`;
    };
    let timeToReturn: string = `${year}-${month}-${date}T${hour}:${minute}:${secondsValueToConvert}Z`;
    return timeToReturn
  }

  componentWillMount() {
    let currentDate: any = new Date();
    this.setState({dateValue: currentDate, timeValue: currentDate, secondsValue: 0});
  }

  render() {
    return (<Paper style={this.paperStyle} zDepth={2}>

      <div style={this.headerStyle}>
        <h1 style={this.mainTitle}>
          Query panel
        </h1>
        <h2 style={this.subTitle}>
          Select "All" to get data related to all drones or type the drone id for a specific drone, then submit your query
        </h2>
      </div>

      <div style={this.paperContentWrapStyle}>
        <div style={this.inputBoxStyle}>
          <div style={this.inputBoxTitleRowStyle}>
            <h3 style={this.internalTitleStyle}>
              Milestone filter
            </h3>
          </div>
          <div style={this.doubleRowStyle}>
            <div style={this.doubleRowInternalLeftWrapStyle}>
              <RadioButtonGroup name='milestoneSelection' defaultSelected="all" onChange={this.handleMilestoneChange}>
                <RadioButton labelStyle={this.radioLabelStyle} iconStyle={this.radioIconStyle} value="all" label="All" style={this.radioButtonSpacedStyle}/>
                <RadioButton labelStyle={this.radioLabelStyle} iconStyle={this.radioIconStyle} value="number" label="Number" style={this.radioButtonSpacedStyle}/>
                <RadioButton labelStyle={this.radioLabelStyle} iconStyle={this.radioIconStyle} value="none" label="None"/>
              </RadioButtonGroup>
            </div>
            <div style={this.doubleRowInternalRightWrapStyle}>
              <TextField disabled={this.state.milestoneInputDisabled} inputStyle={this.textInputStyle} value={this.state.milestoneIntegerValue} fullWidth={true} hintText="Type the milestone number" floatingLabelText="Milestone nr." floatingLabelStyle={this.floatingLabelStyle} underlineFocusStyle={this.underlineFocusStyle} type="number" onChange={this.handleChangeMilestoneText}/>
            </div>
          </div>
        </div>

        <div style={this.inputBoxStyle}>
          <div style={this.inputBoxTitleRowStyle}>
            <h3 style={this.internalTitleStyle}>
              State filter
            </h3>
          </div>
          <div style={this.inputInternalRowStyle}>
            <SelectField labelStyle={this.selectLabelStyle} fullWidth={true} style={this.selectLoginElement} value={this.state.stateInputValue} onChange={this.handleChangeStateInputSelect} floatingLabelText="Selected issue state" floatingLabelStyle={this.floatingLabelStyle} iconStyle={this.selectIconStyle}>
              <MenuItem value={1} primaryText="Open"/>
              <MenuItem value={2} primaryText="Closed"/>
              <MenuItem value={3} primaryText="All"/>
            </SelectField>
          </div>
        </div>

        <div style={this.inputBoxStyle}>
          <div style={this.inputBoxTitleRowStyle}>
            <h3 style={this.internalTitleStyle}>
              Assignee filter
            </h3>
          </div>
          <div style={this.doubleRowStyle}>
            <div style={this.doubleRowInternalLeftWrapStyle}>
              <RadioButtonGroup name='assigneeSelection' defaultSelected="all" onChange={this.handleAssigneeChange}>
                <RadioButton labelStyle={this.radioLabelStyle} iconStyle={this.radioIconStyle} value="all" label="All" style={this.radioButtonSpacedStyle}/>
                <RadioButton labelStyle={this.radioLabelStyle} iconStyle={this.radioIconStyle} value="text" label="Text" style={this.radioButtonSpacedStyle}/>
                <RadioButton labelStyle={this.radioLabelStyle} iconStyle={this.radioIconStyle} value="none" label="None"/>
              </RadioButtonGroup>
            </div>
            <div style={this.doubleRowInternalRightWrapStyle}>
              <TextField disabled={this.state.assigneeInputDisabled} inputStyle={this.textInputStyle} value={this.state.assigneeTextValue} fullWidth={true} hintText="Type the assignee name" floatingLabelText="Assignee name" floatingLabelStyle={this.floatingLabelStyle} underlineFocusStyle={this.underlineFocusStyle} type="text" onChange={this.handleChangeAssigneeText}/>
            </div>
          </div>
        </div>

        <div style={this.inputBoxStyle}>
          <div style={this.inputBoxTitleRowStyle}>
            <h3 style={this.internalTitleStyle}>
              Creator filter
            </h3>
          </div>
          <div style={this.doubleRowStyle}>
            <div style={this.doubleRowInternalLeftWrapStyle}>
              <div style={this.checkBoxWrapStyle}>
                <Checkbox style={this.checkBoxStyle} iconStyle={this.checkBoxIconStyle} label="Include" labelStyle={this.checkBoxLabelStyle} checked={this.state.creatorFilterChecked} onCheck={this.updateCreatorFilterChecked}/>
              </div>
            </div>
            <div style={this.doubleRowInternalRightWrapStyle}>
              <TextField disabled={this.state.creatorInputDisabled} inputStyle={this.textInputStyle} value={this.state.creatorTextValue} fullWidth={true} hintText="Type the creator name" floatingLabelText="Creator name" floatingLabelStyle={this.floatingLabelStyle} underlineFocusStyle={this.underlineFocusStyle} type="text" onChange={this.handleChangeCreatorText}/>
            </div>
          </div>
        </div>

        <div style={this.inputBoxStyle}>
          <div style={this.inputBoxTitleRowStyle}>
            <h3 style={this.internalTitleStyle}>
              Mentioned filter
            </h3>
          </div>
          <div style={this.doubleRowStyle}>
            <div style={this.doubleRowInternalLeftWrapStyle}>
              <div style={this.checkBoxWrapStyle}>
                <Checkbox style={this.checkBoxStyle} iconStyle={this.checkBoxIconStyle} label="Include" labelStyle={this.checkBoxLabelStyle} checked={this.state.mentionedFilterChecked} onCheck={this.updateMentionedFilterChecked}/>
              </div>
            </div>
            <div style={this.doubleRowInternalRightWrapStyle}>
              <TextField disabled={this.state.mentionedInputDisabled} inputStyle={this.textInputStyle} value={this.state.mentionedTextValue} fullWidth={true} hintText="Type the mentioned name" floatingLabelText="Mentioned name" floatingLabelStyle={this.floatingLabelStyle} underlineFocusStyle={this.underlineFocusStyle} type="text" onChange={this.handleChangeMentionedText}/>
            </div>
          </div>
        </div>

        <div style={this.inputBoxStyle}>
          <div style={this.inputBoxTitleRowStyle}>
            <h3 style={this.internalTitleStyle}>
              Labels filter
            </h3>
          </div>
          <div style={this.doubleRowStyle}>
            <div style={this.doubleRowInternalLeftWrapStyle}>
              <div style={this.innerDoubleRowStyle}>
                <TextField inputStyle={this.textInputStyle} value={this.state.labelTextValue} fullWidth={true} hintText="Add a label" floatingLabelText="Label" floatingLabelStyle={this.floatingLabelStyle} underlineFocusStyle={this.underlineFocusStyle} type="text" onChange={this.handleChangeLabelText}/>
              </div>
              <div style={this.innerDoubleRowStyle}>
                <RaisedButton disabled={this.state.labelButtonDisabled} label="Add" secondary={true} onMouseDown={this.addLabel}/>
              </div>
            </div>
            <div style={this.doubleRowChipWrapStyle}>
              {this.state.chipData.map(this.renderChip, this)}
            </div>
          </div>
        </div>

        <div style={this.inputBoxStyle}>
          <div style={this.inputBoxTitleRowStyle}>
            <h3 style={this.internalTitleStyle}>
              Sort filter
            </h3>
          </div>
          <div style={this.inputInternalRowStyle}>
            <SelectField labelStyle={this.selectLabelStyle} fullWidth={true} style={this.selectLoginElement} value={this.state.sortInputValue} onChange={this.handleChangeSortInputSelect} floatingLabelText="Sort by" floatingLabelStyle={this.floatingLabelStyle} iconStyle={this.selectIconStyle}>
              <MenuItem value={1} primaryText="Created"/>
              <MenuItem value={2} primaryText="Updated"/>
              <MenuItem value={3} primaryText="Comments"/>
            </SelectField>
          </div>
        </div>

        <div style={this.inputBoxStyle}>
          <div style={this.inputBoxTitleRowStyle}>
            <h3 style={this.internalTitleStyle}>
              Direction filter
            </h3>
          </div>
          <div style={this.inputInternalRowStyle}>
            <SelectField labelStyle={this.selectLabelStyle} fullWidth={true} style={this.selectLoginElement} value={this.state.directionInputValue} onChange={this.handleChangeDirectionInputSelect} floatingLabelText="Sort direction" floatingLabelStyle={this.floatingLabelStyle} iconStyle={this.selectIconStyle}>
              <MenuItem value={1} primaryText="Ascending"/>
              <MenuItem value={2} primaryText="Descending"/>
            </SelectField>
          </div>
        </div>

        <div style={this.inputBoxStyle}>
          <div style={this.inputBoxTitleRowStyle}>
            <h3 style={this.internalTitleStyle}>
              Time filter
            </h3>
          </div>
          <div style={this.doubleRowStyle}>
            <div style={this.doubleRowInternalLeftWrapStyle}>
              <div style={this.checkBoxWrapStyle}>
                <Checkbox style={this.checkBoxStyle} iconStyle={this.checkBoxIconStyle} label="Include" labelStyle={this.checkBoxLabelStyle} checked={this.state.secondsFilterChecked} onCheck={this.updateSecondsFilterChecked}/>
              </div>
            </div>
            <div style={this.doubleRowInternalRightTimeWrapStyle}>
              <DatePicker value={this.state.dateValue} disabled={this.state.dateInputDisabled} onChange={this.handleDatePickerChange} inputStyle={this.timeTextFieldStyle} hintText="Choose the date" mode="landscape"/>
              <TimePicker value={this.state.timeValue} disabled={this.state.timeInputDisabled} onChange={this.handleTimePickerChange} inputStyle={this.timeTextFieldStyle} hintText="Choose the time"/>
              <TextField value={this.state.secondsValue} disabled={this.state.secondsInputDisabled} onChange={this.handleChangeSecondsText} inputStyle={this.textInputStyle} fullWidth={true} hintText="Seconds value" floatingLabelText="Seconds" floatingLabelStyle={this.floatingLabelStyle} underlineFocusStyle={this.underlineFocusStyle} type="number"/>
            </div>
          </div>
        </div>

        <div style={this.submitRowStyle}>
          <div>
            <FloatingActionButton mini={true} secondary={true} onMouseDown={this.validateDetails}>
              <RightArrow/>
            </FloatingActionButton>
          </div>
        </div>

      </div>

    </Paper>);
  }
}

export default Radium(QueryPanel);

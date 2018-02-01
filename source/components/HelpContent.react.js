// React
import React from 'react';
import {Step, Stepper, StepButton, StepContent} from 'material-ui/Stepper';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';

class HelpContent extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      stepIndex: 0
    };
    this.handleNext = this.handleNext.bind(this);
    this.handlePrev = this.handlePrev.bind(this);

  }
  handleNext() {
    const {stepIndex} = this.state;
    if (stepIndex < 3) {
      this.setState({
        stepIndex: stepIndex + 1
      });
    }
  }

  handlePrev() {
    const {stepIndex} = this.state;
    if (stepIndex > 0) {
      this.setState({
        stepIndex: stepIndex - 1
      });
    }
  }

  renderStepActions(step) {
    return (
      <div style={{
        margin: '12px 0'
      }}>
        {step < 3 &&  (<RaisedButton label="Next" disableTouchRipple={true} disableFocusRipple={true} primary={true} onTouchTap={this.handleNext} style={{
          marginRight: 12
        }}/>)}
        {step > 0 && (<FlatButton label="Back" disableTouchRipple={true} disableFocusRipple={true} onTouchTap={this.handlePrev}/>)}
      </div>
    );
  }

  render() {
    const {stepIndex} = this.state;
    return (
        <div style={{
          maxWidth: 380,
          maxHeight: 500,
          margin: 'auto'
        }}>
          <Stepper activeStep={stepIndex} linear={false} orientation="vertical">
            <Step>
              <StepButton onTouchTap={() => this.setState({stepIndex: 0})}>
                Step 1
              </StepButton>
              <StepContent>
                <p>
                  Instruction for step 1.
                </p>
                {this.renderStepActions(0)}
              </StepContent>
            </Step>
            <Step>
              <StepButton onTouchTap={() => this.setState({stepIndex: 1})}>
                Step 2
              </StepButton>
              <StepContent>
                <p>
                  Instruction for step 2
                </p>
                {this.renderStepActions(1)}
              </StepContent>
            </Step>
            <Step>
              <StepButton onTouchTap={() => this.setState({stepIndex: 2})}>
                Step 3
              </StepButton>
              <StepContent>
                <p>
                  Instruction for step 3.
                </p>
                {this.renderStepActions(2)}
              </StepContent>
            </Step>
            <Step>
              <StepButton onTouchTap={() => this.setState({stepIndex: 3})}>
                Step 4
              </StepButton>
              <StepContent>
                <p>
                  Instruction for step 4.
                </p>
                {this.renderStepActions(3)}
              </StepContent>
            </Step>
          </Stepper>
        </div>
    );
  }

}

export default HelpContent;

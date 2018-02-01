// Style Modules
import GeneralStyle from './GeneralStyle';

let inputInternalRowStyle = {
  padding: '25px'
}

let doubleRowInternalWrapStyle = {
  display: 'flex',
  alignItems: 'space-between',
  width: '50%'
}

let panelRowStyle = {
  width: '100%',
  display: 'flex',
  alignItems: 'center'
}

let style = {
  paperStyle: {
    ...GeneralStyle.paperStyle,
    backgroundColor: '#7986CB'
  },

  internalTitleStyle: {
    ...GeneralStyle.genericTitle,
    fontSize: '10pt',
    fontWeight: '200'
  },

  inputBoxStyle: {
    border: '1px solid #ffffff',
    marginBottom: '25px'
  },

  inputBoxTitleRowStyle: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    height: '20px',
    borderBottom: '1px solid #ffffff'
  },

  doubleRowStyle: {
    ...inputInternalRowStyle,
    display: 'flex'
  },

  doubleRowInternalLeftWrapStyle: {
    ...doubleRowInternalWrapStyle,
    justifyContent: 'space-between'
  },

  doubleRowInternalRightWrapStyle: {
    ...doubleRowInternalWrapStyle,
    justifyContent: 'center'
  },

  radioButtonSpacedStyle: {
    marginBottom: '16px'
  },

  radioIconStyle: {
    fill: '#ffffff'
  },

  submitRowStyle: {
    ...panelRowStyle,
    height: '50px',
    justifyContent: 'center'
  },

  underlineFocusStyle: {
    borderColor: '#FC4482'
  }

}

export default style

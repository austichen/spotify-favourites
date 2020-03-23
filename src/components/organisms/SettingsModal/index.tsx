import React, {useState} from 'react';
import Modal from '../../molecules/Modal'
import {Title, Label} from '../../atoms'
import {IResultsSettings, RESULT_TYPES, TIME_RANGES} from '../../../Utils2/constants'
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import './SettingsModal.css'

interface Props {
    isOpen : boolean
    resultsSettings : IResultsSettings
    onClose? : (settings : IResultsSettings) => void
}

const stringToResultEnum = (key : string) => key === 'artists' ? RESULT_TYPES.artists : RESULT_TYPES.tracks;

const stringToTimeEnum = (key : string) => {
    switch (key) {
        case 'long_term': return TIME_RANGES.long_term
        case 'medium_term': return TIME_RANGES.medium_term
        case 'short_term': return TIME_RANGES.short_term
        default: return TIME_RANGES.short_term
    }
}

const SettingsModal = ({isOpen, onClose = () => {}, resultsSettings} : Props) => {
    const [settings, setSettings] = useState<IResultsSettings>(resultsSettings)

    const handleResultTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSettings({...settings, type: stringToResultEnum((event.target as HTMLInputElement).value)});
      };

    const handleTimeRangeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSettings({...settings, timeRange: stringToTimeEnum((event.target as HTMLInputElement).value)});
    };
  return (
      <Modal
        isOpen={isOpen}
        onClose={() => onClose(settings)}
      >
        <div className="settings-modal">
            <Title fontSize='2rem'>Select your time range and result type.</Title>
            <Label>Result type</Label>
            <RadioGroup aria-label="result-type" name="result-type" value={settings.type} onChange={handleResultTypeChange}>
                <FormControlLabel value={RESULT_TYPES.tracks} control={<Radio />} label={RESULT_TYPES.tracks} />
                <FormControlLabel disabled value={RESULT_TYPES.artists} control={<Radio />} label={RESULT_TYPES.artists} />
            </RadioGroup>
            <Label>Time range</Label>
            <RadioGroup aria-label="time-range" name="time-range" value={settings.timeRange} onChange={handleTimeRangeChange}>
                <FormControlLabel value={TIME_RANGES.short_term} control={<Radio />} label='Short term (last 4 weeks)' />
                <FormControlLabel value={TIME_RANGES.medium_term} control={<Radio />} label='Medium term (last 6 months)' />
                <FormControlLabel value={TIME_RANGES.long_term} control={<Radio />} label='Long term (years)' />
            </RadioGroup>
        </div>
      </Modal>
  );
}

export default SettingsModal

import { InputAdornment, Stack, TextField } from '@mui/material';

const TimePicker = (props: {
  h: number | string;
  m: number | string;
  s: number | string;

  onChange: (
    h: number | string,
    m: number | string,
    s: number | string
  ) => void;
}) => {
  return (
    <Stack direction="row">
      <TextField
        fullWidth
        InputProps={{
          startAdornment: <InputAdornment position="start">h</InputAdornment>,
        }}
        value={props.h}
        onChange={(e) => {
          if (e.target.value == '') props.onChange('', props.m, props.s);
          
          const val = parseInt(e.target.value);
          if (val != NaN && val < 100 && val >= 0)
            props.onChange(val, props.m, props.s);
        }}
      />
      <TextField
        fullWidth
        InputProps={{
          startAdornment: <InputAdornment position="start">m</InputAdornment>,
        }}
        value={props.m}
        onChange={(e) => {
          if (e.target.value == '') props.onChange(props.h, '', props.s);
          
          const val = parseInt(e.target.value);
          if (val != NaN && val < 60 && val >= 0)
            props.onChange(props.h, val, props.s);
        }}
      />
      <TextField
        fullWidth
        InputProps={{
          startAdornment: <InputAdornment position="start">s</InputAdornment>,
        }}
        onChange={(e) => {
          if (e.target.value == '') props.onChange(props.h, props.m, '');

          const val = parseInt(e.target.value);
          if (val != NaN && val < 60 && val >= 0)
            props.onChange(props.h, props.m, val);
        }}
        value={props.s}
      />
    </Stack>
  );
};

export default TimePicker;

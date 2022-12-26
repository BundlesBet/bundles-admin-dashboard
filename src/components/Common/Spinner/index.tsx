import classes from './Spinner.module.scss';

export default function Spinner(props: any) {
  return (
    <div
      className={`${classes.spinner} ${props.className === 'centerSpinner' ? classes.centerSpinner : ''}`}
    />
  );
}

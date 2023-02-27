export const TextField = ({
  className,
  name,
  rows,
  cols,
  wrap,
  placeHolder,
  defaultValue,
  children,
  onChange,
}) => {
  return (
    <div className={className}>
      <label htmlFor={name}>{children}</label>
      <textarea
        id={name}
        name={name}
        rows={rows}
        cols={cols}
        wrap={wrap}
        placeholder={placeHolder}
        defaultValue={defaultValue}
        onChange={onChange}
        required
      ></textarea>
    </div>
  )
}

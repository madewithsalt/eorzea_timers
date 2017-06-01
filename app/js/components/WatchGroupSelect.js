import { isObject } from 'lodash';

const WatchGroupSelect = (props) => (
  <div className="input-field">
    <select name="" id="">
      {props.options.map((item) => {
        const obj = isObject(item)
        return (
          <option value={obj ? item.value : item}>{obj ? item.name : item}</option>
        )
      })}
    </select>
  </div>
)


export default WatchGroupSelect;

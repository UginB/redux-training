
// Задача для этого компонента:
// Фильтры должны формироваться на основании загруженных данных
// Фильтры должны отображать только нужных героев при выборе
// Активный фильтр имеет класс active
// Изменять json-файл для удобства МОЖНО!
// Представьте, что вы попросили бэкенд-разработчика об этом
import { useSelector, useDispatch} from 'react-redux';
import { setFilter } from '../../actions';

const HeroesFilters = () => {
    const {filters} = useSelector(state => state);
    const dispatch = useDispatch();

    const onCurrentFilter = (e) => {
        dispatch(setFilter(e.target.getAttribute('data-value')));
    }

    const renderButtons = (arr) => {
        return arr.map(({label, value, classlist}, index) => {
            return <button 
                        onClick={onCurrentFilter}
                        data-value={value} 
                        key={index} 
                        className={"btn " + classlist}>
                            {label}
                    </button>
        })
    }

    const elements = renderButtons(filters);
    
    return (
        <div className="card shadow-lg mt-4">
            <div className="card-body">
                <p className="card-text">Отфильтруйте героев по элементам</p>
                <div className="btn-group">
                    <button 
                        onClick={onCurrentFilter}
                        data-value='all' 
                        className="btn btn-outline-dark active">
                            Все
                    </button>
                    {/* <button className="btn btn-danger">Огонь</button>
                    <button className="btn btn-primary">Вода</button>
                    <button className="btn btn-success">Ветер</button>
                    <button className="btn btn-secondary">Земля</button> */}
                    {elements}
                </div>
            </div>
        </div>
    )
}

export default HeroesFilters;
// "filters": [
  //   "all",
  //   "fire",
  //   "water",
  //   "wind",
  //   "earth"
  // ]
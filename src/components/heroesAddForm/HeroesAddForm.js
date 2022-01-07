// Задача для этого компонента:
// Реализовать создание нового героя с введенными данными. Он должен попадать
// в общее состояние и отображаться в списке + фильтроваться
// Уникальный идентификатор персонажа можно сгенерировать через uiid
// Усложненная задача:
// Персонаж создается и в файле json при помощи метода POST
// Дополнительно:
// Элементы <option></option> желательно сформировать на базе
// данных из фильтров

import { useState, useEffect } from 'react';
import { heroAdd, elementsAdd } from '../../actions';
import { useDispatch, useSelector} from 'react-redux';
import { useHttp } from '../../hooks/http.hook';
import { v4 as uuidv4 } from 'uuid';


const HeroesAddForm = () => {
    const [hero, setHero] = useState({id: uuidv4()});
    const {filters} = useSelector(state => state);
    const {request} = useHttp();
    const dispatch = useDispatch();

    useEffect(() => {
        request("http://localhost:3001/filters")
            .then(data => dispatch(elementsAdd(data)));
        // eslint-disable-next-line
    }, []);

    const onVlueChange = (e) => {
        let value = e.target.value;
        switch(e.target.name) {
            case 'name':
                setHero({...hero, name: value});
                break;
            case 'text':
                setHero({...hero, description: value});
                break;
            case 'element':
                setHero({...hero, element: value});
                break;
            default:
                console.log('error');
                break;
        }
    }

    const onSubmit = (e) => {
        e.preventDefault();
        dispatch(heroAdd(hero));
        request("http://localhost:3001/heroes",'POST', JSON.stringify(hero));
        setHero({id: uuidv4()});
        document.querySelector('form').reset();
    }

    const renderElementsList = (arr) => {
        return arr.map(({value, label}, index) => {
            return <option key={index} value={value}>{label}</option>
        })
    }
    
    const elements = renderElementsList(filters);
 
    return (
        <form className="border p-4 shadow-lg rounded" onSubmit={onSubmit}>
            <div className="mb-3">
                <label htmlFor="name" className="form-label fs-4">Имя нового героя</label>
                <input 
                    required
                    type="text" 
                    name="name" 
                    className="form-control" 
                    id="name" 
                    placeholder="Как меня зовут?"
                    value={hero.name}
                    onChange={onVlueChange}/>
            </div>

            <div className="mb-3">
                <label htmlFor="text" className="form-label fs-4">Описание</label>
                <textarea
                    required
                    name="text" 
                    className="form-control" 
                    id="text" 
                    placeholder="Что я умею?"
                    style={{"height": '130px'}}
                    value={hero.text}
                    onChange={onVlueChange}/>
            </div>

            <div className="mb-3">
                <label htmlFor="element" className="form-label">Выбрать элемент героя</label>
                <select 
                    required
                    className="form-select" 
                    id="element" 
                    name="element"
                    value={hero.element}
                    onChange={onVlueChange}>
                    <option value = "">Я владею элементом...</option>
                    {/* <option value="fire">Огонь</option>
                    <option value="water">Вода</option>
                    <option value="wind">Ветер</option>
                    <option value="earth">Земля</option> */}
                    {elements}
                </select>
            </div>
            <button type="submit" className="btn btn-primary">Создать</button>
        </form>
    )
}

export default HeroesAddForm;
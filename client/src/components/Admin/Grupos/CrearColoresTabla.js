import { useState } from 'react';

import Button from '../../UI/Button/Button';
import Input from '../../UI/Input/Input';
import Select from '../../UI/Select/Select';
import { crearColoresTabla } from '../../../api';
import classes from './CrearColoresTabla.module.css';

const CrearColoresTabla = ({
  grupos,
  setColoresElegidos,
  setIdGrupoActivo,
}) => {
  const [coloresTabla, setColoresTabla] = useState([]);

  const idGrupos = [];

  for (let grupo of grupos) {
    idGrupos.push(grupo.id);
  }

  const controladorCambioInput = (evt) => {
    const index = +evt.target.name.split('-')[1];
    const dato = evt.target.name.split('-')[0];

    coloresTabla[index][dato] = evt.target.value;
  };

  const controladorCrearColoresTabla = async (evt) => {
    evt.preventDefault();

    if (coloresTabla.length > 0) {
      crearColoresTabla([coloresTabla, idGrupos]);
    }

    setIdGrupoActivo(grupos[0].id);
    setColoresElegidos(true);
  };

  const inputsColores = [];

  for (let i = 0; i < coloresTabla.length; i++) {
    inputsColores.push(
      <div key={i} className={classes['grupo-inputs']}>
        <Input
          id={`posiciones-${i}`}
          required={true}
          label="Posiciones"
          onChange={controladorCambioInput}
          value={coloresTabla[i].posiciones}
        />
        <Select
          label="Color"
          id={`color-${i}`}
          onChange={controladorCambioInput}
          required={true}
          value={coloresTabla[i].color}
          options={[
            { value: '', texto: 'Elegir Color' },
            { value: 'verde', texto: 'Verde' },
            { value: 'verde2', texto: 'Verde 2' },
            { value: 'dorado', texto: 'Dorado' },
            { value: 'bronce', texto: 'Bronce' },
            { value: 'rojo2', texto: 'Rojo' },
            { value: 'celeste', texto: 'Celeste' },
            { value: 'celeste2', texto: 'Celeste 2' },
            { value: 'amarillo', texto: 'Amarillo' },
            { value: 'plateado', texto: 'Plateado' },
          ]}
        />
        <Input
          id={`nota-${i}`}
          required={true}
          label="Nota"
          onChange={controladorCambioInput}
          value={coloresTabla[i].nota}
        />
      </div>
    );
  }

  return (
    <form className={classes.form} onSubmit={controladorCrearColoresTabla}>
      <div className={classes.titulo}>
        <h3>Agregar Colores Tabla</h3>
        <div>
          <Button
            onClick={() =>
              setColoresTabla((estadoPrevio) => {
                let nuevoEstado = [
                  ...estadoPrevio,
                  { posiciones: '', color: '', nota: '' },
                ];
                return nuevoEstado;
              })
            }
            className={`${classes.btn} ${classes['btn-agregar']}`}
          >
            Agregar Color
          </Button>
          <Button
            onClick={() =>
              setColoresTabla((estadoPrevio) => {
                const nuevoEstado = [...estadoPrevio].slice(0, -1);
                return nuevoEstado;
              })
            }
            className={`${classes.btn} ${classes['btn-agregar']}`}
          >
            Quitar Color
          </Button>
        </div>
      </div>

      {inputsColores.length !== 0 ? (
        inputsColores
      ) : (
        <p>Sin colores en la tabla</p>
      )}

      <Button
        type="submit"
        className={`${classes.btn} ${classes['btn-crear']}`}
      >
        Siguiente
      </Button>
    </form>
  );
};

export default CrearColoresTabla;

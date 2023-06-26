import CrearGrupos from './CrearGrupos';
import CrearColoresTabla from './CrearColoresTabla';

const ConfiguracionGrupos = ({
  grupos,
  idCategoriaFecha,
  idFecha,
  idFase,
  coloresElegidos,
  setColoresElegidos,
}) => {
  if (!coloresElegidos) {
    return (
      <CrearColoresTabla
        setColoresElegidos={setColoresElegidos}
        grupos={grupos}
        idFecha={idFecha}
        idCategoriaFecha={idCategoriaFecha}
        idFase={idFase}
      />
    );
  }

  return (
    <CrearGrupos
      idFecha={idFecha}
      idCategoriaFecha={idCategoriaFecha}
      idFase={idFase}
      setColoresElegidos={setColoresElegidos}
    />
  );
};

export default ConfiguracionGrupos;

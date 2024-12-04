import React, {useState, useEffect} from 'react';
import { FormControl, InputLabel, OutlinedInput } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';

//Declaração do componente CriarTarefa, recebendo como props, do Componente ListarTarefa, os states handClose, tarefas e setTarefas
const CriarTarefa = ({handleClose, tarefas, setTarefas}) =>{
  const hoje = new Date().toLocaleDateString('fr-CA', {year:"numeric", month: "2-digit", day:"2-digit"});
  const tresDiasDepois = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000)
  .toLocaleDateString('fr-CA', { year: "numeric", month: "2-digit", day: "2-digit" });

  const [idTarefa, setIdTarefa] = useState();
  const [tituloTarefa, setTituloTarefa] = useState('');
  const [descricaoTarefa, setDescricaoTarefa] = useState('');
  const [inicioTarefa, setInicioTarefa] = useState(hoje);
  const [fimTarefa, setFimTarefa] = useState(tresDiasDepois);
  const [recursoTarefa, setRecursoTarefa] = useState('');
  const [statusTarefa, setStatusTarefa] = useState('');
  
  useEffect(() => {
    //Abaixo uma variável é declarada para armazenar o id da tarefa, somando 1 ao maior id existente atualmente no state Tarefas
    let proximoId = Math.max(...tarefas.map(tarefa => tarefa.idTarefa)) + 1;
    setIdTarefa(proximoId);
  },[]);

  const handleRecurso = (event) => {
    setRecursoTarefa(event.target.value);
  };

  const handleStatus = (event) => {
    setStatusTarefa(event.target.value);
  };

  const handleSalvar = () => {
    //Para inspecionarmos nosso código, uma boa estratégia é utilizarmos o console.log.
    //  Com o console.log, podemos visualizar o seu conteúdo na aba Console, no inspecionador de elementos, na janela do navegador
    console.log(`id: ${idTarefa} \n titulo: ${tituloTarefa} \n descrição: ${descricaoTarefa} \n inicio: ${inicioTarefa} \n fim: ${fimTarefa} \n recurso: ${recursoTarefa} \n status: ${statusTarefa}`);

    setTarefas(
      [...tarefas, 
        {
          idTarefa,
          tituloTarefa,
          descricaoTarefa,
          inicioTarefa,
          fimTarefa,
          recursoTarefa,
          statusTarefa
        }
      ]);
    //console.log(`Tarefas: ` + JSON.stringify(tarefas));
    handleClose();
  };

  return(
    <Grid container spacing={2}>
      <Card sx={style}>
        <CardHeader
          title="Tarefas"
          subheader="Cadastro de Tarefas"
        /> 
        <CardContent sx={{
          width: '95%',
          maxWidth: '100%',
        }}>
          <Grid item xs={12} mb={2}>
            <FormControl fullWidth>
              <InputLabel htmlFor="tarefa_titulo">Título da Tarefa</InputLabel>
              <OutlinedInput id="tarefa_titulo" aria-describedby="tarefa_titulo_helper_text" label="Título da Tarefa" 
                value={tituloTarefa} onChange={e => { setTituloTarefa(e.target.value) }} />
            </FormControl>
          </Grid>
          <Grid item xs={12} mb={2}>  
            <FormControl fullWidth>
              <InputLabel htmlFor="tarefa_titulo">Descrição da Tarefa</InputLabel>
              <OutlinedInput id="tarefa_descricao"
                label="Descrição da Tarefa" aria-describedby="tarefa_descricao_helper_text" value={descricaoTarefa}
                onChange={e => { setDescricaoTarefa(e.target.value) }} />
            </FormControl>
          </Grid>
          <Grid container spacing={2} mt={1}>
            <Grid item xs={3}>  
              <FormControl>
                <InputLabel htmlFor="tarefa_inicio">Início da Tarefa</InputLabel>
                <OutlinedInput id="tarefa_inicio" type="date"
                  label="Início da Tarefa" aria-describedby="tarefa_inicio_helper_text" value={inicioTarefa} 
                  onChange={e => { setInicioTarefa(e.target.value) }}
                  sx={{
                    color:'rgba(0, 0, 0, 0.6)',
                    fontWeight: 400,
                    paddingLeft:'13px'
                  }} 
                />
              </FormControl>
            </Grid>  
            <Grid item xs={3}>  
              <FormControl>
                <InputLabel htmlFor="tarefa_fim">Fim da Tarefa</InputLabel>
                <OutlinedInput id="tarefa_fim" type="date" label="Fim da Tarefa" 
                  aria-describedby="tarefa_fim_helper_text" value={fimTarefa} onChange={e => { setFimTarefa(e.target.value) }}
                  sx={{
                    color:'rgba(0, 0, 0, 0.6)',
                    fontWeight: 400,
                    paddingLeft:'13px'
                  }} 
                />
              </FormControl>
            </Grid>
            <Grid item xs={3}>  
              <FormControl fullWidth>
                <InputLabel htmlFor="tarefa_recurso">Recurso</InputLabel>
                <Select
                  id="tarefa_recurso"
                  value={recursoTarefa}
                  label="Recurso"
                  onChange={handleRecurso}
                  size="medium"
                  sx={{
                    color:'rgba(0, 0, 0, 0.6)',
                    fontWeight: 400,
                  }} 
                >
                  <MenuItem value={'Recurso 1'}>Recurso 1</MenuItem>
                  <MenuItem value={'Recurso 2'}>Recurso 2</MenuItem>
                  <MenuItem value={'Recurso 3'}>Recurso 3</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={3}>  
              <FormControl fullWidth>
                <InputLabel htmlFor="tarefa_recurso">Status</InputLabel>
                <Select
                  id="tarefa_status"
                  value={statusTarefa}
                  label="Status"
                  onChange={handleStatus}
                  size="medium"
                  sx={{
                    color:'rgba(0, 0, 0, 0.6)',
                    fontWeight: 400,
                  }} 
                >
                  <MenuItem value={'Aguardando'}>Aguardando</MenuItem>
                  <MenuItem value={'Em Andamento'}>Em Andamento</MenuItem>
                  <MenuItem value={'Concluída'}>Concluída</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid container spacing={2} pl={2} mt={2}>
              <Grid item xs={1} mr={2}>
                <Button size="small" variant="contained" onClick={handleSalvar}>Salvar</Button>
              </Grid>  
              <Grid item xs={1}>  
                <Button size="small" variant="outlined" onClick={handleClose}>Cancelar</Button>  
              </Grid>
            </Grid>  
          </Grid>
        </CardContent>
      </Card>
    </Grid>
  );
}

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '60%',
  bgcolor: 'background.paper',
  p: 4,
};

export default CriarTarefa;
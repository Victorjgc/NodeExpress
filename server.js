const express = require('express');
const app = express();
app.use(express.json());

const users = [{name: 'Pepe', id: 1}, {name: 'Raul', id: 2}];
app.get('/', (req, res) => {
  res.json(users);
});

app.get('/users', (req, res) => {
  res.json(users);
});


app.get('/get/dado', (req, res) => {
  const dado = Math.floor(Math.random()*6) + 1;

  res.json(dado);
});

app.get('/dado/:id', (req, res) => {
  const dadoId = Number(req.params.id);//esto siempre es un string

  const dado = Math.floor(Math.random()*dadoId) + 1;

  res.json(dado);
});

app.get('/users/:id', (req, res) =>{
  const userId = Number(req.params.id);//esto siempre es un string
  console.log(userId);   
  if(userId){
    const user = users.find(user => user.id === userId);
    res.json(user);
  } else {
    res.json("error");
  }
});

//para cverificar que haya esos campos
const mandatoryField = ['name', 'username'];

app.post('/users', (req, res) => {
  const newUser = req.body;
  console.log(newUser);
  // if(Object.keys(req.body).length === 0 . Esto contempla que el objeto esté totalmente vacío
	// si queremos solo que mire si name está vacío: newUser.name  == ""
  if(Object.keys(req.body)[0] === mandatoryField[0] && Object.keys(req.body)[1] === mandatoryField[1]){

    newUser.id = Math.random();
    users.push(newUser);
    res.json(newUser);
  }else{
    res.status(400).send('Te has equivocado tu, no yo');

  }
});

app.listen(3000, () => console.log('Ready on port 3000!'));

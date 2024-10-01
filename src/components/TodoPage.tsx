/**
 * @todo YOU HAVE TO IMPLEMENT THE DELETE AND SAVE TASK ENDPOINT, A TASK CANNOT BE UPDATED IF THE TASK NAME DID NOT CHANGE, YOU'VE TO CONTROL THE BUTTON STATE ACCORDINGLY
 */
import { Check, Delete } from "@mui/icons-material";
import {
  Box,
  Button,
  Container,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import useFetch from "../hooks/useFetch.ts";
import { Task } from "../index";

const TodoPage = () => {
  const api = useFetch();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskName, setNewTaskName] = useState<string>(""); // État pour la nouvelle tâche

  const handleFetchTasks = async () => setTasks(await api.get("/tasks"));

  const handleDelete = async (id: number) => {
    // @todo IMPLEMENT HERE : DELETE THE TASK & REFRESH ALL THE TASKS, DON'T FORGET TO ATTACH THE FUNCTION TO THE APPROPRIATE BUTTON
    await api.delete(`/tasks/${id}`);
    console.log(`bouton cliqué, tâche ${id} supprimée`);
    handleFetchTasks();
  };

  const handleSave = async () => {
    // @todo IMPLEMENT HERE : SAVE THE TASK & REFRESH ALL THE TASKS, DON'T FORGET TO ATTACH THE FUNCTION TO THE APPROPRIATE BUTTON
    if (newTaskName.length === 0) {
      console.log("Le nom de la tâche ne peut pas être vide.");
      return;
    }

    //Sinon créer une nouvelle tâche
    await api.post("/tasks", { name: newTaskName });
    console.log(`bouton cliqué, tâche ${newTaskName} ajoutée`);
    setNewTaskName(""); //Réinitialiser champ de saisie
    handleFetchTasks(); //Réactualise la liste des tâches
  };

  const handleEdit = async (id: number, updatedName: string) => {
    await api.patch(`/tasks/${id}`, { name: updatedName });
    console.log(`tâche ${id} ${updatedName} modifiée`);
    handleFetchTasks();
  };

  useEffect(() => {
    (async () => {
      handleFetchTasks();
    })();
  }, []);

  return (
    <Container>
      <Box display="flex" justifyContent="center" mt={5}>
        <Typography variant="h2">HDM Todo List</Typography>
      </Box>

      <Box justifyContent="center" mt={5} flexDirection="column">
        {tasks.map((task) => (
          <Box
            key={task.id} //ajout clé unique pour chaque élément de la liste
            display="flex"
            justifyContent="center"
            alignItems="center"
            mt={2}
            gap={1}
            width="100%"
          >
            <TextField
              size="small"
              value={task.name}
              onChange={(e) => {
                console.log("TARGET", e.target);
                handleEdit(task.id, e.target.value);
              }} // Met à jour la tâche directement
              fullWidth
              sx={{ maxWidth: 350 }}
            />

            <Box>
              <IconButton color="success" disabled>
                <Check />
              </IconButton>
              <IconButton
                color="error"
                onClick={() => {
                  handleDelete(task.id); //supprime tâche en fonction de l'id de la tâche
                }}
              >
                <Delete />
              </IconButton>
            </Box>
          </Box>
        ))}

        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          mt={2}
          flexDirection="column"
          marginRight={11}
        >
          <TextField
            size="small"
            value={newTaskName}
            onChange={(e) => setNewTaskName(e.target.value)} // Met à jour l'état lors de la saisie
            placeholder="Nouvelle tâche"
            sx={{ width: 350, marginBottom: 3 }}
          />
          <Button
            variant="outlined"
            onClick={() => {
              handleSave();
            }}
          >
            Ajouter une tâche
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default TodoPage;

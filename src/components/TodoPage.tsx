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
  const api = useFetch(); // Hook pour les appels API
  const [tasks, setTasks] = useState<Task[]>([]); // État des tâches
  const [newTaskName, setNewTaskName] = useState<string>(""); // État pour la nouvelle tâche
  const [errorMessage, setErrorMessage] = useState(""); //État pour le message d'erreur

  // Fonction pour récupérer toutes les tâches
  const handleFetchTasks = async () => {
    const fetchedTasks = await api.get("/tasks");
    setTasks(fetchedTasks); // Mise à jour de l'état avec les tâches récupérées
  };

  // Fonction pour supprimer une tâche
  const handleDelete = async (id: number) => {
    try {
      await api.delete(`/tasks/${id}`);
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id)); // Mise à jour locale
      console.log(`Task ${id} supprimée`);
    } catch (error) {
      console.error(`Erreur lors de la suppression de la tâche ${id}`, error);
    }
  };

  // Fonction pour enregistrer une nouvelle tâche
  const handleSave = async () => {
    if (newTaskName.length === 0) {
      setErrorMessage("Le nom de la tâche ne peut pas être vide.");
      return;
    }

    try {
      const newTask = await api.post("/tasks", { name: newTaskName });
      setTasks((prevTasks) => [...prevTasks, newTask]); // Ajouter la nouvelle tâche localement
      setNewTaskName(""); // Réinitialisation du champ de saisie
      setErrorMessage(""); //Réinitialisation message erreur s'il n'y en a plus
      console.log("Nouvelle tâche ajoutée :", newTask);
    } catch (error) {
      setErrorMessage(
        "Une erreur est survenue lors de l'ajout de la nouvelle tâche"
      );
    }
  };

  // Fonction pour modifier une tâche existante
  const handleEdit = async (id: number, updatedName: string) => {
    try {
      const updatedTask = await api.patch(`/tasks/${id}`, {
        name: updatedName,
      });

      // Mettre à jour la tâche localement dans le tableau tasks
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === id ? { ...task, name: updatedName } : task
        )
      );
      console.log(`Tâche ${id} mise à jour :`, updatedTask);
    } catch (error) {
      setErrorMessage(
        "Une erreur est survenue lors de la modification de la tâche"
      );
    }
  };

  // Charger les tâches au premier rendu
  useEffect(() => {
    handleFetchTasks();
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
                console.log("TARGET", e.target.value);
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

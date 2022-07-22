import React, { useEffect, useRef, useState } from 'react';

import {
  Image,
  StyleSheet, 
  Text,
  TextInput,
  TouchableOpacity, 
  View
} from 'react-native';

import Icon from 'react-native-vector-icons/Feather';
import editIcon from '../assets/icons/edit/pen-edit.png';
import trashIcon from '../assets/icons/trash/trash.png';

import { EditTaskArgs } from '../pages/Home';
import { Task } from './TasksList';

interface TaskItemProps {
  editTask: ({taskId, taskNewTitle}: EditTaskArgs) => void;
  task: Task;
  removeTask: (id: number) => void;
  toggleTaskDone: (id: number) => void;
}

export function TaskItem({ 
  editTask, 
  task, 
  removeTask, 
  toggleTaskDone
}: TaskItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [taskNewTitleValue, setTaskNewTitleValue] = useState(task.title);
  const textInputRef= useRef<TextInput>(null)

  function handleStartEditing() {
    setIsEditing(true);
  }

  function handleCancelEditing() {
    setTaskNewTitleValue(task.title);
    setIsEditing(false);
  }

  function handleSubmitEditing() {
    editTask({ taskId: task.id, taskNewTitle: taskNewTitleValue });
    setIsEditing(false);
  }

  useEffect(() => {
    if(textInputRef.current) {
      if(isEditing) {
        textInputRef.current.focus();
      } else {
        textInputRef.current.blur();
      }
    }
  }, [isEditing])

  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
      <View>
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.taskButton}
          onPress={() => toggleTaskDone(task.id)}
        >
          <View 
            style={task.done ? styles.taskMarkerDone : styles.taskMarker}
          >
            { task.done && (
              <Icon 
                name="check"
                size={12}
                color="#FFF"
              />
            )}
          </View>

          <TextInput 
            editable={isEditing}
            onChangeText={setTaskNewTitleValue}
            onSubmitEditing={handleSubmitEditing}
            ref={textInputRef}
            style={task.done ? styles.taskTextDone : styles.taskText}
            value={taskNewTitleValue}
          />
        </TouchableOpacity>
      </View>

      <View>
        { isEditing ? (
          <TouchableOpacity
            onPress={handleCancelEditing}
          >
            <Icon color="#b2b2b2" name="x" size={24} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={{ paddingHorizontal: 24 }}
            onPress={handleStartEditing}
          >
            <Image source={editIcon} />
          </TouchableOpacity>          
        )}
        <View />

        <TouchableOpacity
            disabled={isEditing}
            onPress={() => removeTask(task.id)}
          >
            <Image source={trashIcon} style={{ opacity: isEditing ? 0.2 : 1 }} />
        </TouchableOpacity>     
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  taskButton: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 15,
    marginBottom: 4,
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center'
  },
  taskMarker: {
    height: 16,
    width: 16,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#B2B2B2',
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  taskText: {
    color: '#666',
    fontFamily: 'Inter-Medium'
  },
  taskMarkerDone: {
    height: 16,
    width: 16,
    borderRadius: 4,
    backgroundColor: '#1DB863',
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  taskTextDone: {
    color: '#1DB863',
    textDecorationLine: 'line-through',
    fontFamily: 'Inter-Medium'
  }
})
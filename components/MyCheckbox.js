import { StyleSheet, Pressable } from "react-native";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  removeHobbiesPerso,
  removeHobbiesFamille,
  removeHobbiesAmis,
  addHobbiesPerso,
  addHobbiesFamille,
  addHobbiesAmis,
} from "../reducers/hobbiesReducer";
import { Ionicons } from "@expo/vector-icons";

function MyCheckbox(props) {
  const [checked, setChecked] = useState(props.isChecked);
  const dispatch = useDispatch();
  const who = useSelector((state) => state.hobbies.value.who);

  const handlePress = () => {
    setChecked(!checked);

    if (!checked) {
      if (who === "perso") {
        dispatch(addHobbiesPerso(props.id));
      } else if (who === "famille") {
        dispatch(addHobbiesFamille(props.id));
      } else if (who === "amis") {
        dispatch(addHobbiesAmis(props.id));
      }
    } else {
      if (who === "perso") {
        dispatch(removeHobbiesPerso(props.id));
      } else if (who === "famille") {
        dispatch(removeHobbiesFamille(props.id));
      } else if (who === "amis") {
        dispatch(removeHobbiesAmis(props.id));
      }
    }
  };

  return (
    <Pressable
      style={[styles.checkboxBase, checked && styles.checkboxChecked]}
      onPress={() => handlePress()}
    >
      {checked && <Ionicons name="checkmark" size={24} color="#004644" />}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  checkboxBase: {
    width: 24,
    height: 24,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    borderWidth: 2,
    borderColor: "#cae1db",
    backgroundColor: "#cae1db",
  },
  checkboxChecked: {
    backgroundColor: "white",
  },
});

export default MyCheckbox;

import { TouchableOpacity, View, StyleSheet } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";

function Return({ onPress }) {
  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity style={styles.logoutBtn} onPress={onPress}>
        <FontAwesome name="arrow-left" size={25} color="#cae1db" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    height: "100%",
    width: "100%",
  },
  logoutBtn: {
    height: "100%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Return;

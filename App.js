import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  SafeAreaView,
  View,
  TextInput,
  Platform,
  TouchableOpacity,
} from "react-native";
import { readMessages, send } from "./src/firebase";
import { Messages } from "./src/Messages";
import { colors, sizes } from "./src/theme";

export default function App() {
  const [draft, setDraft] = useState("");
  const [alias, setAlias] = useState(Platform.OS);
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    readMessages((data) => {
      const messages = [];
      for (let k in data) {
        messages.push({
          date: k,
          alias: data[k].alias,
          message: data[k].message,
        });
      }
      setMessages(messages);
    });
  }, []);
  return (
    <SafeAreaView style={styles.root}>
      <StatusBar style="auto" />
      <View style={styles.container}>
        <View style={styles.aliasContainer}>
          <Text style={styles.inputLabel}>Alias</Text>
          <TextInput
            style={styles.inputText}
            onChangeText={setAlias}
            value={alias}
          />
        </View>
        <View style={styles.messagesContainer}>
          <Messages messages={messages} />
        </View>
        <View style={styles.sendContainer}>
          <TextInput
            style={styles.inputText}
            multiline={true}
            onChangeText={setDraft}
            value={draft}
          />
          <TouchableOpacity
            style={styles.sendAction}
            onPress={() => {
              if (draft.length > 0) {
                send(alias, draft);
                setDraft("");
              }
            }}
          >
            <Text style={styles.sendText}>SEND</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.ORANGE,
  },
  container: {
    backgroundColor: colors.GREY,
    flex: 1,
    alignItems: "stretch",
    justifyContent: "center",
    padding: 20,
  },
  aliasContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  messagesContainer: {
    flex: 5,
  },
  sendContainer: {
    flex: 2,
  },
  inputLabel: {
    flex: 1,
  },
  inputText: {
    borderRadius: sizes.RADIUS,
    borderWidth: 0,
    padding: 10,
    backgroundColor: colors.WHITE,
    flex: 2,
  },
  sendAction: {
    marginVertical: 5,
    alignItems: "center",
    justifyContent: "center",
    height: 40,
    borderRadius: sizes.RADIUS,
    backgroundColor: colors.BLUE,
  },
  sendText: {
    color: colors.WHITE,
    fontSize: 20,
    fontWeight: "500",
  },
});

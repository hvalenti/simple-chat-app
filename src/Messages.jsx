import React, { useRef } from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import { colors, sizes } from "./theme";

export const Messages = ({ messages }) => {
  const scrollView = useRef();
  const messagesRender = messages.map((m) => {
    const { date } = m;
    const messageDate = new Date(Number.parseInt(date));
    console.log(date, messageDate);
    return (
      <View key={m.date} style={styles.messageContainer}>
        <View style={styles.messageTitle}>
          <Text style={styles.messageAlias}>{m.alias}</Text>
          <Text style={styles.messageDate}>{messageDate.toLocaleString()}</Text>
        </View>
        <Text style={styles.messageBody}>{m.message}</Text>
      </View>
    );
  });
  return (
    <ScrollView
      ref={scrollView}
      style={styles.mainContainer}
      onContentSizeChange={() =>
        scrollView.current.scrollToEnd({ animated: true })
      }
    >
      {messagesRender}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    marginBottom: 5,
  },
  messageContainer: {
    borderRadius: sizes.RADIUS,
    padding: 5,
    marginVertical: 5,
    backgroundColor: colors.WHITE,
  },
  messageTitle: {
    flexDirection: "row",
  },
  messageAlias: {
    color: colors.BLUE,
    fontSize: 10,
    flex: 1,
  },
  messageDate: {
    textAlign: "right",
    color: colors.BLUE,
    fontSize: 10,
    flex: 3,
  },
  messageBody: {
    fontSize: 12,
  },
});

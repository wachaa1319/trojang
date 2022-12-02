import { useNavigation } from "@react-navigation/native";
import { Heading, Pressable, Text, View, VStack } from "native-base";
import React from "react";
import { SafeTop } from "../../../../components/SafeTop";
import { RootStackNavigationProp } from "../../../../types";
import BackButton from "../../../components/BackButton";

export const AddFriendScreen = () => {
  const navigation = useNavigation<RootStackNavigationProp<"AddFriend">>();
  return (
    <View variant="background" flex={1}>
      <SafeTop />
      <BackButton />
      <Heading ml={10} fontSize="4xl">
        Add Friend
      </Heading>

      <VStack m="12" flex={1} justifyContent="center" mb={"32"}>
        <Pressable
          left={4}
          bg="fuchsia.900"
          p="12"
          borderRadius={10}
          m="2"
          onPress={null}
        >
          <Heading>Add New Friend</Heading>
        </Pressable>
        <Pressable
          right={4}
          bg="darkBlue.900"
          p="12"
          borderRadius={10}
          m="2"
          onPress={() => navigation.navigate("AddFromContacts")}
        >
          <Heading>Add From Contact</Heading>
        </Pressable>
      </VStack>
    </View>
  );
};
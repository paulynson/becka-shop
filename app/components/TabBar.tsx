import { Entypo } from "@expo/vector-icons";
import { TouchableOpacity, View } from "react-native";

export function TabBar({ state, descriptors, navigation }: any) {
  const icon: any = {
    index: (props: any) => (
      <Entypo name="home" size={24} color="#222" {...props} />
    ),
    discover: (props: any) => (
      <Entypo name="globe" size={24} color="#222" {...props} />
    ),
    cart: (props: any) => (
      <Entypo name="shopping-cart" size={24} color="#222" {...props} />
    ),

    favourite: (props: any) => (
      <Entypo name="heart" size={24} color="#222" {...props} />
    ),

    account: (props: any) => (
      <Entypo name="user" size={24} color="#222" {...props} />
    ),
  };
  return (
    <View className="absolute flex-row items-center justify-between py-5 mx-12 bg-green-100 border-green-600 rounded-full shadow-lg bottom-6">
      {state.routes.map(
        (
          route: { key: string | number; name: any; params: any },
          index: any
        ) => {
          const { options } = descriptors[route.key];

          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name, route.params);
            }
          };

          return (
            <TouchableOpacity
              key={route.name}
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              className="items-center justify-center flex-1 gap-3 "
            >
              {icon[route.name]({
                color: isFocused ? "#16a34a" : "#6b7280",
              })}
            </TouchableOpacity>
          );
        }
      )}
    </View>
  );
}

import {  ActivityIndicator, View } from "react-native";
import { layout } from "../styles";

export default function Loader(){
    return(
        <View style={[layout.columnCenter]}>
            <ActivityIndicator
                size={20}
            />
        </View>
    )
}



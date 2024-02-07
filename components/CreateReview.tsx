import { Modal, Text, TextInput, View } from "react-native";
import { color } from "../styles";


export default function CreateReview({visible,setVisible,productId}){
    return(
        <Modal
        visible={visible}
        animationType='slide'
        onRequestClose={()=>setVisible(!visible)}
        >
            <View>
                <Text style={[color.contentPrimary]}>Add Review</Text>
            </View>
            <View>
                <View>
                    <TextInput
                    multiline={true}
                    numberOfLines={4}
                    />
                </View>
            </View>
        </Modal>
    )
}

// Nhập các component điều khiển tùy chỉnh
import RadioGroup from "./RadioGroup"; // Nhập component RadioGroup
import Input from "./Input";             // Nhập component Input
import Select from "./Select";           // Nhập component Select
import Checkbox from "./Checkbox";       // Nhập component Checkbox
// import DatePicker from "./DatePicker";   // Nhập component DatePicker
import Button from "./Button";           // Nhập component Button
import ActionButton from "./ActionButton";
// Tạo đối tượng Controls chứa tất cả các component điều khiển
const Controls = {
    Input,        // Component Input
    RadioGroup,   // Component RadioGroup
    Select,       // Component Select
    Checkbox,     // Component Checkbox
    // DatePicker,   // Component DatePicker
    Button,        // Component Button
    ActionButton
};

// Xuất đối tượng Controls để sử dụng ở nơi khác trong ứng dụng
export default Controls;

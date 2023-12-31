import {defineRule} from "vee-validate"; // npm install vee-validate --save
import {required, email, min, numeric, max, confirmed} from "@vee-validate/rules"; // npm install @vee-validate/rules

defineRule('confirmed', confirmed)
defineRule("required", required);
defineRule("numeric", numeric);
defineRule("email", email);
defineRule("min", min);
defineRule("max", max);

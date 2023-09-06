import { shallowMount } from "@vue/test-utils";
import GetLocation from "./components/GetLocation.vue";
import App from "./App.vue";

describe("App", ():void  => {
  it("renders GetLocation component", ():void => {
    const wrapper = shallowMount<typeof App>(App);
    expect(wrapper.findComponent(GetLocation).exists()).toBe(true);
  });
});
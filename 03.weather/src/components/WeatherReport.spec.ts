import { vi } from 'vitest'
import { mount, shallowMount, flushPromises } from '@vue/test-utils'
import WeatherReport from './WeatherReport.vue'

describe('WeatherReport', () => {
  it("should render the component without crashing", (): void => {
    global.fetch = vi.fn() as any
    const wrapper = shallowMount(WeatherReport, {
      props: {
        coords: {
          latitude: 0,
          longitude: 0
        }
      }
    })
    expect(wrapper).toBeTruthy();
  });


  it('displays loading message when data is undefined', (): void => {
    global.fetch = vi.fn(() => Promise.resolve({
      json: () => Promise.resolve()
    })) as any

    const wrapper = shallowMount(WeatherReport, {
      props: {
        coords: {
          latitude: 0,
          longitude: 0
        }
      }
    })

    expect(wrapper.text()).toContain('Loading...')
  });

  it('displays weather data when data is defined', async () => {
    const mockData = {
      location: {
        localtime: new Date(),
        name: 'Eindhoven',
        region: 'North Brabant',
        country: 'Netherlands',
        lat: 52.37,
        lon: 4.9
      },
      current: {
        temp_c: 10,
        temp_f: 50,
        humidity: 50,
        precip_in: 0.1,
        precip_mm: 2.5,
        condition: {
          text: 'Sunny',
          icon: 'https://via.placeholder.com/150'
        },
        wind_degree: 180,
        wind_dir: 'S',
        wind_kph: 10,
        wind_mph: 6.2
      }
    }

    global.fetch = vi.fn(() => Promise.resolve({
      json: () => Promise.resolve(mockData)
    })) as any

    const wrapper = mount(WeatherReport, {
      props: {
        coords: {
          latitude: 0,
          longitude: 0
        }
      }
    })

    await flushPromises();

    expect(wrapper.text()).toContain(mockData.current.condition.text)
    expect(wrapper.text()).toContain(mockData.current.temp_c)
    expect(wrapper.text()).toContain(mockData.location.name)
    expect(wrapper.text()).toContain(mockData.location.region)
    expect(wrapper.text()).toContain(mockData.current.wind_kph)
    expect(wrapper.text()).toContain(mockData.current.wind_degree)
  });

  it('displays formats the datetime to a locale format', async () => {

    const mockDateTime = new Date(2000, 12, 31, 11, 45, 0, 0)
    vi.setSystemTime(mockDateTime)

    const mockData = {
      location: {
        localtime: new Date(),
      },
      current: {
        condition: {},
        wind_degree: 180,
      }
    }

    global.fetch = vi.fn(() => Promise.resolve({
      json: () => Promise.resolve(mockData)
    })) as any

    const wrapper = mount(WeatherReport, {
      props: {
        coords: {
          latitude: 0,
          longitude: 0
        }
      }
    })

    await flushPromises();

    const localtime = wrapper.find("[data-testid=localtime]");

    expect(localtime.text()).toEqual('January 31, 2001 at 11:45 AM')
    vi.useRealTimers()
  });
});

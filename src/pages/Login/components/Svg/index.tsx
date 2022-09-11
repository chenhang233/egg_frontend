import { useEffect } from 'react'
import { shallowEqual } from 'react-redux'
import { useAppDispatch, useAppSelector } from '../../../../redux/hook'
import { getSvgCaptcha } from '../../../../redux/slice'

const Svg = () => {
  const dispatch = useAppDispatch()
  const svgString = useAppSelector(
    (state) => state.user.svgCaptcha as string,
    shallowEqual
  )
  useEffect(() => {
    dispatch(getSvgCaptcha())
  }, [dispatch])
  return svgString ? (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="100"
      height="40"
      viewBox="0,0,100,40"
    >
      {svgString}
      {/* <rect width="100%" height="100%" fill="#cc9966" />
      <path d="M18 6 C37 16,51 18,84 11" stroke="#b64fd8" fill="none" />
      <path
        fill="#544f4f"
        d="M75.79 23.73L75.76 23.70L75.69 23.63Q74.20 23.67 73.09 24.94L73.09 24.94L72.95 24.79Q71.90 26.12 71.73 27.82L71.65 27.75L71.68 27.78Q71.60 29.74 72.57 30.61L72.42 30.46L72.40 30.44Q73.52 31.46 75.39 31.35L75.28 31.24L75.37 31.33Q77.22 31.17 78.20 30.56L78.21 30.57L78.20 30.56Q79.15 29.50 79.15 28.11L79.20 28.16L79.23 28.19Q79.26 27.88 79.20 27.54L79.07 27.41L79.22 27.56Q79.18 25.97 78.20 24.76L78.22 24.78L78.15 24.71Q77.29 23.63 75.79 23.73ZM75.30 33.54L75.33 33.57L75.39 33.63Q71.50 33.65 70.24 32.97L70.10 32.82L70.12 32.84Q69.26 32.22 69.09 30.69L69.04 30.65L69.05 30.65Q69.16 30.19 69.19 29.54L69.03 29.38L69.06 29.40Q69.23 28.59 69.23 28.18L69.25 28.20L69.13 28.08Q69.70 25.69 69.83 25.08L69.80 25.04L69.71 24.96Q70.06 23.16 70.81 21.91L70.96 22.06L70.92 22.03Q73.23 18.04 78.53 12.36L78.55 12.39L78.66 12.49Q80.90 12.08 82.87 11.37L82.89 11.38L83.03 11.53Q76.73 18.01 73.88 21.78L73.87 21.78L73.97 21.88Q74.75 21.33 75.91 21.33L76.03 21.45L76.05 21.47Q78.99 21.46 80.35 23.19L80.31 23.15L80.36 23.20Q81.58 24.69 81.89 27.85L81.86 27.83L81.82 27.79Q81.94 28.49 81.94 29.03L81.90 28.99L81.84 28.93Q81.91 31.79 79.94 32.74L79.99 32.79L79.87 32.67Q78.73 33.16 75.26 33.50ZM77.34 35.68L77.35 35.69L77.46 35.80Q78.49 35.65 80.26 35.71L80.34 35.79L80.36 35.81Q81.72 35.78 83.11 35.13L83.27 35.29L83.26 35.28Q84.23 34.55 84.23 32.95L84.26 32.98L84.15 32.87Q84.22 32.50 84.06 31.61L83.96 31.51L84.02 31.57Q83.90 30.72 83.90 30.31L83.87 30.28L83.88 30.29Q83.06 26.03 81.63 24.33L81.61 24.32L81.56 24.27Q81.57 24.24 81.43 24.03L81.48 24.08L81.20 23.87L81.20 23.91L81.13 23.83Q80.82 23.39 80.27 22.54L80.22 22.48L80.23 22.49Q79.53 21.76 77.76 21.35L77.76 21.35L77.70 21.29Q78.71 19.79 81.36 16.49L81.42 16.54L85.16 11.79L85.15 11.78Q83.73 12.54 81.59 13.22L81.62 13.24L81.70 13.32Q82.55 12.48 84.15 10.71L84.10 10.66L84.01 10.57Q81.93 11.58 78.46 12.09L78.49 12.12L78.45 12.08Q73.42 17.42 70.77 21.83L70.62 21.68L70.67 21.74Q69.43 24.10 68.92 29.68L68.87 29.62L68.77 29.52Q68.70 30.03 68.77 30.88L68.77 30.88L68.88 31.00Q68.90 32.51 69.89 33.33L69.80 33.24L69.93 33.37Q70.24 33.47 70.20 33.51L70.20 33.50L70.23 33.54Q70.58 34.36 71.29 34.73L71.16 34.60L71.20 34.64Q72.58 35.34 74.32 35.51L74.32 35.51L74.28 35.48Q74.31 35.51 77.44 35.78ZM77.21 25.73L77.29 25.81L77.27 25.79Q77.61 25.51 78.46 25.95L78.52 26.02L78.57 26.07Q78.94 26.99 78.94 27.56L78.83 27.45L78.87 27.49Q78.99 29.10 78.14 29.99L78.19 30.04L78.17 30.02Q77.17 30.61 75.30 30.89L75.38 30.97L75.34 30.93Q74.15 31.03 73.67 30.79L73.59 30.70L73.50 30.62Q73.34 30.22 73.34 29.95L73.41 30.02L73.50 30.10Q73.20 27.09 75.82 25.93L75.73 25.85L75.78 25.89Q76.52 25.65 77.20 25.72Z"
      />
      <path
        fill="#403f3f"
        d="M25.34 34.77L25.42 34.84L25.45 34.88Q23.38 34.33 21.44 34.20L21.58 34.34L21.54 34.30Q20.22 32.98 17.84 29.55L17.87 29.57L17.84 29.54Q15.91 32.34 13.77 34.51L13.68 34.42L11.87 34.82L11.81 34.77Q10.98 35.06 10.10 35.30L10.10 35.30L10.06 35.25Q13.87 31.66 16.55 27.98L16.58 28.01L16.46 27.89Q13.51 24.12 8.68 19.84L8.75 19.90L8.76 19.92Q10.69 20.52 13.10 20.90L13.23 21.02L13.11 20.90Q16.29 23.77 17.99 26.19L18.01 26.22L17.89 26.09Q19.84 23.42 22.29 21.18L22.31 21.20L22.33 21.21Q25.06 20.92 26.69 20.48L26.59 20.38L26.66 20.44Q22.49 23.58 19.19 27.66L19.36 27.83L19.23 27.70Q22.19 31.82 25.28 34.71ZM27.81 19.63L27.97 19.79L27.94 19.76Q25.33 20.48 22.17 20.79L22.10 20.72L22.18 20.80Q19.65 23.23 18.12 25.44L18.13 25.45L18.11 25.43Q17.21 24.39 15.75 22.62L15.80 22.68L15.69 22.73L15.58 22.62Q15.52 22.67 15.42 22.67L15.39 22.64L15.34 22.59Q14.78 21.96 13.32 20.67L13.29 20.64L13.20 20.55Q10.08 20.15 7.53 19.06L7.46 18.99L7.53 19.07Q12.47 23.36 16.08 27.95L16.01 27.88L16.09 27.96Q13.06 32.07 9.11 35.91L9.04 35.83L9.15 35.94Q9.29 35.78 12.42 35.03L12.52 35.13L12.45 35.06Q11.06 36.22 9.60 37.41L9.63 37.45L9.66 37.48Q12.53 36.67 15.35 36.50L15.26 36.41L15.29 36.44Q17.52 34.52 19.21 32.07L19.04 31.90L19.20 32.06Q20.46 33.63 21.55 34.68L21.40 34.53L21.52 34.64Q21.65 34.68 21.72 34.75L21.61 34.64L21.79 34.65L21.82 34.68Q22.90 35.62 24.09 36.57L24.08 36.56L24.20 36.68Q27.24 37.01 29.83 37.92L29.91 38.01L29.83 37.93Q24.39 34.02 21.10 29.40L21.20 29.50L21.21 29.51Q24.47 25.02 28.55 21.39L28.51 21.35L28.37 21.20Q27.55 21.54 26.67 21.75L26.69 21.77L24.82 22.11L24.96 22.25Q26.00 21.42 27.94 19.76Z"
      />
      <path
        fill="#484646"
        d="M34.33 33.82L34.19 33.68L34.23 33.73Q30.51 33.84 29.62 31.77L29.69 31.84L29.72 31.86Q30.42 31.04 31.81 29.44L31.88 29.51L31.73 29.35Q32.27 31.25 34.95 31.36L34.98 31.39L34.91 31.32Q38.02 31.47 39.48 30.28L39.45 30.25L39.40 30.20Q40.60 28.71 40.53 26.29L40.52 26.28L40.59 26.35Q40.53 21.90 36.24 22.11L36.24 22.11L36.08 21.94Q33.64 22.16 32.08 23.28L32.15 23.35L31.70 23.04L31.68 23.09L31.53 22.94Q31.85 20.13 31.75 17.68L31.82 17.75L31.88 17.81Q31.71 15.40 31.40 12.44L31.43 12.47L31.37 12.41Q34.66 13.28 38.06 13.18L38.08 13.21L38.02 13.14Q41.55 13.20 44.74 12.08L44.63 11.97L44.11 13.32L44.10 13.31Q43.97 14.13 43.80 14.88L43.65 14.73L43.63 14.71Q40.97 15.75 37.50 15.75L37.56 15.81L37.51 15.77Q36.22 15.76 34.89 15.63L34.83 15.57L34.78 15.51Q34.75 16.16 34.44 20.14L34.39 20.08L34.53 20.22Q35.13 19.67 36.97 19.54L37.03 19.60L37.06 19.63Q40.39 19.83 41.69 21.33L41.68 21.32L41.73 21.37Q42.96 22.74 43.20 26.17L43.11 26.09L43.08 26.05Q43.45 29.92 42.36 31.73L42.30 31.66L42.28 31.64Q40.44 33.31 37.48 33.51L37.48 33.50L37.57 33.60Q36.58 33.56 34.20 33.70ZM39.63 35.76L39.66 35.79L39.71 35.84Q42.63 35.77 44.33 34.79L44.35 34.81L44.48 34.93Q45.37 33.58 45.37 31.71L45.30 31.64L45.19 31.53Q45.25 28.84 44.40 25.17L44.44 25.21L44.46 25.23Q44.08 23.62 42.99 22.36L43.04 22.41L43.02 22.42L42.82 22.16L42.49 21.97L42.58 22.05Q42.35 21.46 41.78 20.84L41.61 20.67L41.68 20.78L41.75 20.85Q40.36 19.32 37.06 19.32L36.98 19.24L36.73 19.23L36.87 19.37Q36.89 18.81 37.06 17.83L37.01 17.78L37.08 17.84Q41.56 17.97 45.16 16.51L45.04 16.39L45.15 16.50Q45.37 15.09 46.22 12.57L46.32 12.67L44.39 13.47L44.39 13.47Q44.83 12.54 45.27 11.52L45.16 11.41L45.17 11.42Q41.78 12.75 38.11 12.82L38.19 12.91L38.07 12.79Q34.47 12.95 30.93 11.97L30.96 12.00L30.86 11.90Q31.56 15.93 31.56 19.87L31.50 19.81L31.47 19.78Q31.44 21.45 31.34 23.15L31.33 23.15L31.50 23.31Q31.56 23.30 32.07 23.58L32.18 23.68L32.07 23.57Q32.48 23.48 33.06 23.17L32.98 23.09L32.99 23.10Q33.08 23.91 32.87 25.27L32.71 25.11L32.78 25.17Q33.21 25.40 33.58 25.60L33.61 25.63L33.50 25.51Q36.12 24.09 37.79 24.09L37.80 24.11L37.68 23.98Q38.80 23.92 39.85 24.49L40.01 24.65L39.88 24.52Q40.20 25.45 40.23 26.30L40.25 26.32L40.27 26.34Q40.43 28.75 39.52 29.73L39.48 29.70L39.39 29.60Q38.19 30.72 36.19 30.92L36.20 30.94L36.17 30.91Q35.40 31.05 34.79 30.98L34.78 30.97L34.83 31.03Q34.00 30.84 33.32 30.54L33.41 30.63L33.28 30.33L33.11 30.36L33.10 30.35Q32.47 30.00 32.00 28.81L32.00 28.81L32.06 28.87Q30.71 29.97 29.22 31.87L29.35 32.00L29.33 31.99Q29.51 32.47 30.26 33.32L30.43 33.49L30.39 33.45Q31.37 35.12 33.89 35.56L33.89 35.56L33.86 35.53Q34.80 35.62 39.59 35.72Z"
      />
      <path
        fill="#464b4d"
        d="M57.18 14.08L57.33 14.23L57.28 14.18Q56.51 14.40 56.38 15.11L56.54 15.28L56.45 19.77L56.41 19.73Q57.45 19.75 59.42 19.52L59.43 19.53L59.49 19.59Q59.40 19.90 59.37 20.65L59.34 20.63L59.38 20.67Q59.45 21.45 59.45 21.85L59.43 21.83L57.87 21.77L57.93 21.84Q57.22 21.91 56.44 21.91L56.46 21.92L56.52 21.98Q56.38 25.59 56.31 33.06L56.49 33.24L56.44 33.19Q54.51 33.30 53.18 33.91L53.05 33.77L53.10 33.83Q54.15 28.42 54.05 21.96L53.91 21.82L53.86 21.78Q53.31 21.77 52.16 21.53L52.18 21.55L52.24 21.61Q52.24 20.73 52.07 19.00L52.03 18.95L51.97 18.89Q53.07 19.45 53.92 19.62L53.94 19.64L53.94 19.64Q53.93 19.09 53.66 16.88L53.55 16.77L53.52 16.74Q53.42 15.02 53.42 14.17L53.36 14.11L53.29 14.03Q53.37 12.61 54.63 12.10L54.70 12.18L54.71 12.19Q55.33 11.75 59.65 11.01L59.61 10.97L59.78 11.14Q60.41 10.92 61.16 10.82L61.17 10.83L61.25 10.91Q61.05 11.59 60.91 12.38L60.73 12.20L60.57 13.69L60.48 13.61Q60.03 13.60 59.59 13.70L59.60 13.72L59.49 13.60Q59.03 13.68 57.33 14.23ZM62.13 15.19L62.06 15.11L62.06 15.12Q62.40 13.18 62.94 10.90L62.95 10.91L62.90 10.86Q62.33 11.14 61.17 11.68L61.30 11.81L61.57 10.21L61.63 10.27Q60.56 10.46 58.35 10.94L58.40 10.99L58.36 10.94Q57.29 10.99 54.43 11.81L54.49 11.87L54.49 11.87Q52.96 12.10 52.96 13.77L53.06 13.87L53.08 13.89Q53.03 14.11 53.10 14.42L53.07 14.39L52.99 14.31Q53.22 15.52 53.32 16.71L53.37 16.76L53.59 19.20L53.54 19.14Q52.27 18.75 51.69 18.35L51.80 18.46L51.85 18.50Q51.90 19.30 51.93 20.22L51.81 20.10L52.02 21.98L51.90 21.85Q52.67 22.15 53.38 22.22L53.41 22.25L53.25 23.95L53.70 24.07L53.63 23.99Q53.68 29.61 52.79 34.47L52.76 34.44L52.72 34.40Q53.54 33.90 54.60 33.66L54.69 33.75L54.48 35.54L54.45 35.52Q55.62 35.32 56.77 35.29L56.73 35.24L56.68 35.20Q57.89 35.29 59.01 35.53L58.99 35.51L59.04 35.55Q58.12 30.92 58.12 23.82L58.27 23.98L58.27 23.97Q59.21 23.93 61.08 23.99L61.07 23.99L61.12 22.37L61.03 22.28Q60.97 21.37 61.00 20.52L61.08 20.60L61.00 20.52Q60.71 20.73 59.75 20.97L59.68 20.89L59.76 20.98Q59.79 20.39 59.89 19.20L59.85 19.16L59.79 19.11Q59.06 19.32 58.34 19.39L58.42 19.47L58.32 19.37Q58.31 18.10 58.42 16.85L58.52 16.95L58.40 16.83Q58.49 16.21 58.97 15.90L59.00 15.93L58.99 15.92Q59.89 15.36 60.62 15.29L60.57 15.24L60.63 15.30Q61.29 15.16 62.04 15.10Z"
      /> */}
    </svg>
  ) : null
}

export default Svg
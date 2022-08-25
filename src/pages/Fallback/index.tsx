import Loading from '../../components/Loading'

const Fallback = () => {
  return (
    <section>
      <Loading
        spanArr={Array.from({ length: 25 }, (_, i) => i + 1)}
        styleObj={{
          margin: 'auto',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
          backgroundColor: '#042104',
        }}
      ></Loading>
    </section>
  )
}

export default Fallback

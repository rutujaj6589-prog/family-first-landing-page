import { motion } from 'framer-motion';
import Home from './pages/Home';

const App = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Home />
    </motion.div>
  );
};

export default App;

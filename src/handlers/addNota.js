const addNotaControllers = require("../controllers/addNotaControllers");

const addNota = async (req, res) => {
    try {
        const {
            titulo,
            descripcion
        } = req.body

        const result = await addNotaControllers(titulo, descripcion);
        
        res.status(200).json({result})
    } catch (error) {
        res.status(404).json({error: error.message});
    }

}
module.exports = addNota
import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import Slider from '@mui/material/Slider'


export default function MaterialsForm({ order, setOrder }) {
    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
        PaperProps: {
            style: {
                maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                width: 250,
            },
        },
    };
    var item;

    const handleChange = (event) => {
        
        const {
            target: { value },
        } = event;
        var array = event.target.value.map((element)=>{
            var item = dbMaterials.find(dbmaterial => dbmaterial.material === element)
            return item
        })
        setSelectedMaterials(
            typeof value === 'string' ? value.split(',') : value,
        );
        setOrder(array)
    };

    const handleSlider = (event, newValue) => {
        var item = order.find(element => element.material === event.target.name)  
        var tempArray = order
        var objIndex = order.findIndex((obj => obj.material == event.target.name));
        item.quantity = newValue
        tempArray[objIndex] = item
        setOrder(tempArray)


    };

    const [selectedMaterials, setSelectedMaterials] = React.useState([])


    const dbMaterials = [
        {
            id: 1,
            material: 'wood',
            price: '100',
            quantity: '40'
        },
        {
            id: 2,
            material: 'metal',
            price: '60',
            quantity: '20'
        },
        {
            id: 3,
            material: 'glass',
            price: '100',
            quantity: '40'
        }, {
            id: 4,
            material: 'plywood',
            price: '50',
            quantity: '100'
        }

    ]
    const materials = [
        'wood',
        'metal',
        'glass',
        'plywood',
    ];

    return (
        <React.Fragment>
            <Typography variant="h6" gutterBottom>
                Materials
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={12}>
                    <FormControl sx={{ m: 1, width: 300 }}>
                        <InputLabel id="material-label">Material</InputLabel>
                        <Select
                            labelId="material-label"
                            id="material-checkbox"
                            multiple
                            value={selectedMaterials}
                            onChange={handleChange}
                            input={<OutlinedInput label="material" />}
                            renderValue={(selected) => selected.join(', ')}
                            MenuProps={MenuProps}
                        >
                            {materials.map((name) => (
                                <MenuItem key={name} value={name}>
                                    <Checkbox checked={selectedMaterials.indexOf(name) > -1} />
                                    <ListItemText primary={name} />
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
                {
                    order.map((material) => {
                        var item = dbMaterials.find(dbmaterial => dbmaterial.material === material.material)
                        return (
                            <Grid item xs={12} sm={12}>
                                <Typography variant="h6" gutterBottom>
                                    {material.material}

                                </Typography>

                                <Slider
                                    size="small"
                                    max={parseInt(item.quantity)}
                                    defaultValue={0}
                                    aria-label="Small"
                                    valueLabelDisplay="auto"
                                    onChange={handleSlider}
                                    name={material.material}
                                />
                            </Grid>
                        )


                    })
                }
            </Grid>
        </React.Fragment>
    );
}